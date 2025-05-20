import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios'; // Assuming axios is installed in your backend
import { z } from 'zod'; // Assuming zod is installed for validation

// Define the schema for the incoming request body
const generatePromptSchema = z.object({
  prompt: z.string(),
  topicId: z.string().optional(), // Optional topicId for context
});

// Define the expected schema for the phrases we want to return
const generatedPhraseSchema = z.object({
  spanish: z.string(),
  english: z.string(),
  note: z.string().optional(),
});

const generatedPhrasesResponseSchema = z.array(generatedPhraseSchema);


export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Validate the request body
    const validationResult = generatePromptSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Invalid request body',
        details: validationResult.error.errors,
      });
    }

    const { prompt, topicId } = validationResult.data;

    // --- IMPORTANT: Replace with your actual DeepSeek API call ---
    // This is a placeholder. You need to implement the actual logic
    // to call the DeepSeek API here.

    // Example DeepSeek API call structure (you need to adjust based on DeepSeek docs):
    const deepSeekApiKey = process.env.DEEPSEEK_API_KEY; // Store your API key in Vercel Environment Variables
    const deepSeekApiUrl = 'YOUR_DEEPSEEK_API_URL'; // Replace with the actual DeepSeek API URL

    if (!deepSeekApiKey) {
        return res.status(500).json({ error: 'DeepSeek API key not configured.' });
    }

    let generatedData: any; // Variable to hold the data from DeepSeek

    try {
        const deepSeekResponse = await axios.post(deepSeekApiUrl, {
            model: 'your-deepseek-model', // Replace with the DeepSeek model you want to use
            messages: [
                { role: 'system', content: 'You are a helpful assistant that generates Spanish phrases and their English translations.' },
                { role: 'user', content: prompt }
            ],
            // Add other parameters as required by DeepSeek API (e.g., max_tokens, temperature)
        }, {
            headers: {
                'Authorization': `Bearer ${deepSeekApiKey}`,
                'Content-Type': 'application/json'
            }
        });

        // Process the response from DeepSeek
        // The structure of the response depends on the DeepSeek API.
        // You will need to extract the generated text.
        // Example: Assuming the response has a structure like { choices: [{ message: { content: "..." } }] }
        const generatedText = deepSeekResponse.data.choices[0]?.message?.content;

        if (!generatedText) {
             return res.status(500).json({ error: 'Failed to get generated text from DeepSeek.' });
        }

        // Attempt to parse the generated text as JSON (assuming you asked DeepSeek for JSON output)
        try {
            generatedData = JSON.parse(generatedText);
            // Validate the parsed data against the expected schema
            generatedPhrasesResponseSchema.parse(generatedData);
        } catch (parseError: any) {
             console.error('Failed to parse DeepSeek response as JSON or validation failed:', parseError);
             // If parsing or validation fails, you might return the raw text or a formatted error
             return res.status(500).json({
                 error: 'Failed to parse or validate generated phrases from AI.',
                 rawResponse: generatedText // Optionally return the raw text for debugging
             });
        }


    } catch (deepSeekError: any) {
        console.error('Error calling DeepSeek API:', deepSeekError.response?.data || deepSeekError.message);
        return res.status(deepSeekError.response?.status || 500).json({
            error: deepSeekError.response?.data?.error?.message || deepSeekError.message || 'Failed to communicate with DeepSeek API.',
            details: deepSeekError.response?.data // Optionally include more details
        });
    }

    // --- End of DeepSeek API call placeholder ---

    // Assuming generatedData is now an array of phrases in the expected format
    res.status(200).json({ phrases: generatedData });

  } catch (error: any) {
    console.error('Error generating phrases:', error);
    res.status(500).json({ error: error.message || 'Failed to generate phrases.' });
  }
}
