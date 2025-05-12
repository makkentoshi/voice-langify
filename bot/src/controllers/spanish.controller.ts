import { BotContext } from '../interfaces';
  import { SpanishPhraseModel } from '../models/spanishPhrase.model';
  import { SpanishTenseModel } from '../models/spanishTense.model';

  export class SpanishController {
    static async startSpanish(ctx: BotContext) {
      await ctx.reply(
        '🇪🇸 Spanish Learning Menu:\n' +
        '/phrase - Learn a random Spanish phrase\n' +
        '/tense - Practice a Spanish tense\n' +
        'Use the Mini App to record your pronunciation.'
      );
    }

    static async getPhrase(ctx: BotContext) {
      const phrase = await SpanishPhraseModel.findOne({ category: 'basic' });
      if (phrase) {
        await ctx.reply(`Phrase: ${phrase.phrase}\nTranslation: ${phrase.translation}\nRecord your pronunciation in the Mini App.`);
      } else {
        await ctx.reply('No phrases found. Try again later.');
      }
    }

    static async getTense(ctx: BotContext) {
      const tense = await SpanishTenseModel.findOne({ name: 'present' });
      if (tense) {
        await ctx.reply(`Tense: ${tense.name}\nExample: ${tense.example}\nRecord your example in the Mini App.`);
      } else {
        await ctx.reply('No tenses found. Try again later.');
      }
    }

    static async handleTranscription(ctx: BotContext) {
      if (ctx.session.language === 'es-ES' && ctx.session.transcript) {
        await ctx.reply(`📜 Your Spanish pronunciation: ${ctx.session.transcript}`);
        // Add pronunciation evaluation logic if needed
      }
    }
  }