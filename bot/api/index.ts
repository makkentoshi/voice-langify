import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import mongoose from 'mongoose';
import { z } from 'zod';

// Подключение к MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'YOUR_MONGODB_CONNECTION_STRING';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Определение базовой схемы пользователя (пример)
const userSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  // Добавьте другие поля пользователя, если необходимо
});

const User = mongoose.model('User', userSchema);

// Zod схемы для валидации
const generatePhraseSchema = z.object({
  prompt: z.string().min(1),
});

const generatedPhraseResponseSchema = z.object({
  phrase: z.string(),
});

const telegramUpdateSchema = z.object({
  update_id: z.number(),
  message: z.object({
    chat: z.object({
      id: z.number(),
    }),
    text: z.string().optional(),
    web_app_data: z.object({
      data: z.string(),
    }).optional(),
    // Добавьте другие поля сообщения, если необходимо
  }).optional(),
  // Добавьте другие типы обновлений, если необходимо (callback_query, inline_query и т.д.)
});


// Инициализация Express приложения для Vercel
const app = express();
app.use(bodyParser.json());

// Настройка CORS (базовая)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // В продакшене замените '*' на домен вашего мини-приложения
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Эндпоинт для генерации испанской фразы
app.post('/api/generate-spanish-phrase', async (req: VercelRequest, res: VercelResponse) => {
  try {
    // Валидация входных данных
    const { prompt } = generatePhraseSchema.parse(req.body);

    // Запрос к DeepSeek API
    const deepseekApiKey = process.env.DEEPSEEK_API_KEY;
    const deepseekApiEndpoint = 'https://api.deepseek.com/chat/completions'; // Актуальный эндпоинт DeepSeek
    const response = await axios.post(deepseekApiEndpoint, {
      model: "deepseek-chat", // Используйте актуальную модель DeepSeek
      messages: [
        { role: "system", content: "You are a helpful assistant that translates and generates Spanish phrases." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 100,
      stream: false,
      // Добавьте другие параметры DeepSeek API, если необходимо
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${deepseekApiKey}`,
      },
    });

    // Обработка и валидация ответа от DeepSeek
    const generatedText = response.data?.choices?.[0]?.message?.content?.trim() || '';

    if (!generatedText) {
         throw new Error('DeepSeek API returned no generated text.');
    }

    // Валидация выходных данных (можно адаптировать под формат DeepSeek)
    // const { phrase } = generatedPhraseResponseSchema.parse({ phrase: generatedText });

    res.status(200).json({ phrase: generatedText });

  } catch (error: any) {
    console.error('Error generating Spanish phrase:', error);

    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid input data', details: error.errors });
    } else if (error.response) {
      // Ошибки от DeepSeek API
      res.status(error.response.status).json({ error: error.response.data });
    }
     else {
      res.status(500).json({ error: 'Failed to generate Spanish phrase' });
    }
  }
});

// Эндпоинт вебхука Telegram
app.post('/api/webhook', async (req: VercelRequest, res: VercelResponse) => {
  try {
    // Валидация входящего обновления Telegram
    const update = telegramUpdateSchema.parse(req.body);
    console.log('Received update:', update);

    if (update.message) {
      const chatId = update.message.chat.id;

      // Пример обработки команды /start
      if (update.message.text === '/start') {
        console.log(`Received /start command from chat ${chatId}`);
        // Отправка сообщения с кнопкой для открытия TMA
        // Вам нужно будет использовать Telegram Bot API для этого
        const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
        const webAppUrl = 'YOUR_VERCEL_BOT_URL'; // Замените на ваш URL

        await axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          chat_id: chatId,
          text: 'Welcome! Click the button below to open the Mini App.',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Open Mini App', web_app: { url: webAppUrl } }]
            ]
          }
        });
      }

      // Пример обработки данных из Web App
      if (update.message.web_app_data) {
        const webAppData = update.message.web_app_data.data;
        console.log('Received data from Web App:', webAppData);

        // Здесь вы можете обработать данные из TMA
        // Например, сохранить их в базу данных, используя Mongoose
        try {
            // Пример сохранения данных в MongoDB (адаптируйте под ваши нужды)
            // const newData = JSON.parse(webAppData); // Если данные в формате JSON
            // const user = await User.findOneAndUpdate(
            //     { telegramId: chatId },
            //     { $set: { someField: newData.someValue } }, // Обновите поля
            //     { upsert: true, new: true }
            // );
            // console.log('User data updated:', user);
        } catch (dbError) {
            console.error('Database error processing web app data:', dbError);
            // Обработайте ошибку базы данных
        }


        // Опционально: отправить подтверждение в чат
         await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
             chat_id: chatId,
             text: 'Data from Mini App received successfully!',
         });
      }
    }

    // Всегда отвечаем 200 OK на вебхуки Telegram, чтобы избежать повторных отправок
    res.status(200).send('OK');

  } catch (error: any) {
    console.error('Error processing Telegram update:', error);

    if (error instanceof z.ZodError) {
      // Не отправляйте детали Zod ошибок обратно Telegram, просто логгируйте
      console.error('Invalid Telegram update data:', error.errors);
      res.status(200).send('Invalid update data'); // Всегда 200 для Telegram
    } else if (error.response && error.response.config && error.response.config.url.includes('api.telegram.org')) {
         // Ошибки при отправке сообщений через Telegram Bot API
         console.error('Telegram Bot API error:', error.response.data);
         res.status(200).send('Telegram API error'); // Всегда 200 для Telegram
    }
     else {
      res.status(200).send('Internal server error'); // Всегда 200 для Telegram
    }
  }
});

// Точка входа Vercel
export default app;
