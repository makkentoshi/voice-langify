import { Bot } from 'grammy';
  import { BotContext } from '../interfaces';
  import { SpanishController } from '../controllers/spanish.controller';

  export function setupSpanishRoutes(bot: Bot<BotContext>) {
    bot.command('spanish', SpanishController.startSpanish);
    bot.command('phrase', SpanishController.getPhrase);
    bot.command('tense', SpanishController.getTense);
    bot.on('message:web_app_data', async (ctx) => {
      if (ctx.session.language === 'es-ES') {
        await SpanishController.handleTranscription(ctx);
      }
    });
  }