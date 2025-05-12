import { Bot } from 'grammy';
  import { BotContext } from '../interfaces';
  import { IeltsController } from '../controllers/ielts.controller';

  export function setupIeltsRoutes(bot: Bot<BotContext>) {
    bot.command('assess_speaking', IeltsController.startIelts);
    bot.on('callback_query:data', IeltsController.handleTopicSelection);
    bot.on('message:web_app_data', async (ctx) => {
      if (ctx.session.language === 'en-US') {
        await IeltsController.handleTranscription(ctx);
      }
    });
  }