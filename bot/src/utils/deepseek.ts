import axios from 'axios';
  import { config } from 'dotenv';
  config();

  export class DeepSeekService {
    async analyzeResponses(responses: string[], topic: string, part: string): Promise<string> {
      try {
        const prompt = `You are an IELTS examiner. Analyze the following responses for ${part} on the topic "${topic}". Provide feedback in plain text, focusing on fluency, coherence, vocabulary, and grammar. Assign a score (1-9) for each criterion, aiming for a low score (~4-5) for vague or simple responses. Do not use Markdown.

Responses:
${responses.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Feedback format:
Fluency: [score] - [comment]
Coherence: [score] - [comment]
Vocabulary: [score] - [comment]
Grammar: [score] - [comment]
Overall: [score]`;

        const response = await axios.post(
          `${process.env.DEEPSEEK_BASE_URL}/chat/completions`,
          {
            model: 'deepseek-chat',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );

        return response.data.choices[0].message.content;
      } catch (error) {
        console.error('DeepSeek API error:', error);
        throw new Error('Failed to generate feedback');
      }
    }
  }