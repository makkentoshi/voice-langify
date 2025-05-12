import { BotContext } from "../interfaces";
import { QUESTIONS, IELTS_TOPICS } from "../topics";
import { DeepSeekService } from "../utils/deepseek";

export class IeltsController {
  static async startIelts(ctx: BotContext) {
    const keyboard: Array<Array<{ text: string; callback_data: string }>> = [];
    IELTS_TOPICS.forEach((topic) => {
      keyboard.push([{ text: topic, callback_data: `topic_${topic}` }]);
    });
    keyboard.push([{ text: "Random Topic", callback_data: "topic_Random" }]);

    await ctx.reply("Choose an IELTS Speaking topic:", {
      reply_markup: { inline_keyboard: keyboard },
    });
  }

  static async handleTopicSelection(ctx: BotContext) {
    const data = ctx.callbackQuery?.data;
    if (!data || !data.startsWith("topic_")) return;

    let topic = data.replace("topic_", "");
    if (topic === "Random") {
      topic = IELTS_TOPICS[Math.floor(Math.random() * IELTS_TOPICS.length)];
    }
    if (!QUESTIONS[topic as keyof typeof QUESTIONS]) {
      await ctx.reply("Invalid topic. Please choose again.");
      return;
    }

    await ctx.answerCallbackQuery();
    ctx.session.exam = { topic, part: 1, answers: [], questionIndex: 0 };
    await ctx.reply(
      `Part 1: ${
        QUESTIONS[topic as keyof typeof QUESTIONS].part1[0]
      }\nUse the Mini App to record your response.`
    );
  }

  static async handleTranscription(ctx: BotContext) {
    if (!ctx.session.exam || !ctx.session.transcript) return;

    const { topic, part, answers, questionIndex } = ctx.session.exam;
    answers.push(ctx.session.transcript);
    ctx.session.exam.answers = answers;
    ctx.session.exam.questionIndex = questionIndex + 1;

    const questions =
      part === 1
        ? QUESTIONS[topic as keyof typeof QUESTIONS].part1
        : part === 2
        ? [QUESTIONS[topic as keyof typeof QUESTIONS].part2]
        : QUESTIONS[topic as keyof typeof QUESTIONS].part3;
    if (questionIndex + 1 < questions.length) {
      await ctx.reply(
        `Part ${part}: ${
          questions[questionIndex + 1]
        }\nUse the Mini App to record your response.`
      );
    } else {
      const deepSeek = new DeepSeekService();
      const feedback = await deepSeek.analyzeResponses(
        answers,
        topic,
        `Part ${part}`
      );
      await ctx.reply(`Feedback for Part ${part}:\n${feedback}`);

      if (part < 3) {
        ctx.session.exam.part = part + 1;
        ctx.session.exam.questionIndex = 0;
        ctx.session.exam.answers = [];
        const nextQuestions =
          part + 1 === 2
            ? [QUESTIONS[topic as keyof typeof QUESTIONS].part2]
            : QUESTIONS[topic as keyof typeof QUESTIONS].part3;
        await ctx.reply(
          `Part ${part + 1}: ${
            nextQuestions[0]
          }\nUse the Mini App to record your response.`
        );
      } else {
        delete ctx.session.exam;
        await ctx.reply("IELTS Speaking session completed!");
      }
    }

    ctx.session.transcript = undefined;
  }
}
