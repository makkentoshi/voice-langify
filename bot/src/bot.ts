import { Bot, InlineKeyboard } from "grammy";
import { conversations } from "@grammyjs/conversations";
import { MongoDBAdapter } from "@grammyjs/storage-mongodb";
import mongoose from "mongoose";
import { BotContext, SessionData } from "./interfaces";
import { setupIeltsRoutes } from "./routes/ielts.route";
import { setupSpanishRoutes } from "./routes/spanish.route";

const bot = new Bot<BotContext>(process.env.BOT_TOKEN!);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
  });

bot.use(async (ctx, next) => {
  const db = mongoose.connection.db;
  if (!db) throw new Error("Database not connected");
  const storage = new MongoDBAdapter<SessionData>({
    collection: db.collection("sessions"),
  });
  ctx.session = await storage.read(ctx.chat?.id.toString() || "");
  ctx.sessionStorage = storage;
  await next();
});

bot.use(conversations());

bot.command("start", async (ctx) => {
  await ctx.reply(
    "🌟 Welcome to VoiceLangify! 🌟\n\n" +
      "Practice IELTS Speaking or learn Spanish:\n" +
      "/assess_speaking - Start IELTS practice\n" +
      "/spanish - Spanish learning menu\n\n" +
      "Use the Mini App below to record your voice!",
    {
      reply_markup: new InlineKeyboard().webApp(
        "Voice Recognition",
        process.env.MINI_APP_URL!
      ),
    }
  );
});

bot.on("message:web_app_data", async (ctx) => {
  const data = JSON.parse(ctx.message.web_app_data.data);
  ctx.session.transcript = data.transcript;
  ctx.session.language = data.language;
  await ctx.reply(`📜 Your response: ${data.transcript}`);
});

setupIeltsRoutes(bot);
setupSpanishRoutes(bot);

bot.catch((err) => {
  console.error("🤖 Bot error:", err);
  err.ctx?.reply("⚠️ An error occurred. Please try again.");
});

export { bot };
