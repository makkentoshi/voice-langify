import { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import axios from "axios";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// Zod схемы для валидации
const generatePhraseSchema = z.object({
  prompt: z.string().min(1),
});

const generatedPhraseResponseSchema = z.object({
  phrase: z.string(),
});

const telegramUpdateSchema = z.object({
  update_id: z.number(),
  message: z
    .object({
      chat: z.object({
        id: z.number(),
      }),
      text: z.string().optional(),
      web_app_data: z
        .object({
          data: z.string(),
        })
        .optional(),
    })
    .optional(),
});

// Определение схемы для хранения фраз в KV
const phraseSchema = z.object({
  spanish: z.string(),
  english: z.string(),
  note: z.string().optional(),
});

// Replace all app.use and app.get/post with direct exports
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://voice-langify-8fmi.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { path } = req.query;

  switch (path) {
    case "generate-spanish-phrase":
      return handleGeneratePhrase(req, res);
    case "spanish-phrases":
      return handleGetPhrases(req, res);
    case "add-spanish-phrases":
      return handleAddPhrases(req, res);
    case "webhook":
      return handleWebhook(req, res);
    default:
      return res.status(404).json({ error: "Not found" });
  }
}

// Move each route handler to a separate function
async function handleGeneratePhrase(req: VercelRequest, res: VercelResponse) {
  try {
    const { prompt } = generatePhraseSchema.parse(req.body);

    const deepseekApiKey = process.env.DEEPSEEK_API_KEY;
    const deepseekApiEndpoint = "https://api.deepseek.com/chat/completions";

    if (!deepseekApiKey) {
      console.error("DeepSeek API key is not configured.");
      return res
        .status(500)
        .json({ error: "DeepSeek API key is not configured on the server." });
    }

    const response = await axios.post(
      deepseekApiEndpoint,
      {
        model: "deepseek-chat", // Используйте актуальную модель DeepSeek
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that translates and generates Spanish phrases.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 100,
        stream: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${deepseekApiKey}`,
        },
      }
    );

    const generatedText =
      response.data?.choices?.[0]?.message?.content?.trim() || "";

    if (!generatedText) {
      console.error(
        "DeepSeek API returned no generated text. Response data:",
        response.data
      );
      // Попытка извлечь сообщение об ошибке из ответа DeepSeek, если оно есть
      const deepseekError =
        response.data?.error?.message ||
        "DeepSeek API returned no generated text.";
      throw new Error(`DeepSeek generation failed: ${deepseekError}`);
    }

    // Валидация выходных данных (опционально)
    // const { phrase } = generatedPhraseResponseSchema.parse({ phrase: generatedText });

    res.status(200).json({ phrase: generatedText });
  } catch (error: any) {
    console.error("Error generating Spanish phrase:", error);

    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "Invalid input data", details: error.errors });
    } else if (error.response) {
      // Логгируем полный ответ DeepSeek в случае ошибки
      console.error("DeepSeek API error response:", error.response.data);
      // Пытаемся вернуть сообщение об ошибке от DeepSeek пользователю
      const deepseekErrorMessage =
        error.response.data?.error?.message ||
        error.response.data ||
        "DeepSeek API error";
      res.status(error.response.status).json({ error: deepseekErrorMessage });
    } else {
      res.status(500).json({
        error: error.message || "Failed to generate Spanish phrase",
      });
    }
  }
}

async function handleGetPhrases(req: VercelRequest, res: VercelResponse) {
  try {
    const topicId = req.query.topicId as string;

    if (!topicId) {
      return res.status(400).json({ error: "Missing topicId" });
    }

    // Ключ в KV для списка фраз по данной теме
    const kvKey = `spanish:phrases:topic:${topicId}`;

    // Получаем данные из Redis по ключу (ожидаем массив JSON объектов)
    const phrases = (await redis.json.get(kvKey)) as
      | z.infer<typeof phraseSchema>[]
      | null;

    if (!phrases) {
      // Если данные не найдены, возвращаем пустой массив
      return res.status(200).json({ phrases: [] });
    }

    // Валидируем полученные данные (опционально, но рекомендуется)
    // Это поможет поймать ошибки, если формат данных в базе неправильный
    try {
      const validatedPhrases = z.array(phraseSchema).parse(phrases);
      res.status(200).json({ phrases: validatedPhrases });
    } catch (zodError: any) {
      console.error("Data in KV does not match schema:", zodError);
      // Возвращаем ошибку сервера, так как формат данных неверный
      res
        .status(500)
        .json({ error: "Data in database has an invalid format." });
    }
  } catch (error: any) {
    console.error("Error fetching Spanish phrases:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch Spanish phrases" });
  }
}

async function handleAddPhrases(req: VercelRequest, res: VercelResponse) {
  try {
    // Схема для валидации массива фраз, отправляемых для добавления
    const addPhrasesSchema = z.object({
      topicId: z.string(),
      phrases: z.array(phraseSchema),
    });

    const { topicId, phrases } = addPhrasesSchema.parse(req.body);

    const kvKey = `spanish:phrases:topic:${topicId}`;

    // Получаем текущие фразы (если есть). Используем redis.json.get для JSON-данных.
    const currentPhrases = (await redis.json.get(kvKey)) as
      | z.infer<typeof phraseSchema>[]
      | null;

    // Объединяем существующие фразы с новыми
    // Здесь можно добавить логику для избегания дубликатов, если необходимо
    const updatedPhrases = currentPhrases
      ? [...currentPhrases, ...phrases]
      : phrases;

    // Сохраняем обновленный массив фраз в Redis.
    // $. - это путь в JSONPath, означает корень документа.
    await redis.json.set(kvKey, "$", updatedPhrases);

    res
      .status(200)
      .json({ message: "Phrases added successfully", count: phrases.length });
  } catch (error: any) {
    console.error("Error adding Spanish phrases:", error);
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Invalid input data for adding phrases",
        details: error.errors,
      });
    } else {
      res
        .status(500)
        .json({ error: error.message || "Failed to add Spanish phrases" });
    }
  }
}

async function handleWebhook(req: VercelRequest, res: VercelResponse) {
  try {
    const update = telegramUpdateSchema.parse(req.body);
    // console.log('Received update:', JSON.stringify(update, null, 2)); // Логгируем полное обновление для отладки

    if (update.message) {
      const chatId = update.message.chat.id;

      if (update.message.text === "/start") {
        console.log(`Received /start command from chat ${chatId}`);
        const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
        const webAppUrl = process.env.VERCEL_BOT_URL || "YOUR_VERCEL_BOT_URL"; // Используем переменную окружения или плейсхолдер

        if (!telegramBotToken) {
          console.error("TELEGRAM_BOT_TOKEN is not configured.");
          return res.status(200).send("Bot token not configured"); // Всегда отвечаем 200 для Telegram
        }

        await axios.post(
          `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
          {
            chat_id: chatId,
            text: "Welcome! Click the button below to open the Mini App.",
            reply_markup: {
              inline_keyboard: [
                [{ text: "Open Mini App", web_app: { url: webAppUrl } }],
              ],
            },
          }
        );
      }

      if (update.message.web_app_data) {
        const webAppData = update.message.web_app_data.data;
        console.log("Received data from Web App:", webAppData);

        // Пример обработки данных из TMA и сохранения в KV (адаптируйте под ваши нужды)
        try {
          // Предположим, webAppData - это JSON строка с данными пользователя
          // const userData = JSON.parse(webAppData);
          // const userKvKey = `user:${chatId}`;
          // await redis.json.set(userKvKey, '$', userData); // Сохраняем JSON данные пользователя
          // console.log('User data saved to KV for chat ID:', chatId);
        } catch (dbError: any) {
          console.error("Database error processing web app data:", dbError);
          // Обработайте ошибку базы данных
        }

        // Опционально: отправить подтверждение в чат
        // Убедитесь, что TELEGRAM_BOT_TOKEN доступен здесь
        if (process.env.TELEGRAM_BOT_TOKEN) {
          await axios.post(
            `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
              chat_id: chatId,
              text: "Data from Mini App received successfully!",
            }
          );
        } else {
          console.error(
            "TELEGRAM_BOT_TOKEN is not configured for sending confirmation."
          );
        }
      }
    }

    res.status(200).send("OK"); // Всегда отвечаем 200 OK на вебхуки Telegram
  } catch (error: any) {
    console.error("Error processing Telegram update:", error);

    if (error instanceof z.ZodError) {
      console.error("Invalid Telegram update data:", error.errors);
      res.status(200).send("Invalid update data"); // Всегда 200 для Telegram
    } else if (
      error.response &&
      error.response.config &&
      error.response.config.url.includes("api.telegram.org")
    ) {
      console.error("Telegram Bot API error:", error.response.data);
      res.status(200).send("Telegram API error"); // Всегда 200 для Telegram
    } else {
      res.status(200).send("Internal server error"); // Всегда 200 для Telegram
    }
  }
}
