const OPENAI_API_TYPE = 'openai';
const DEFAULT_TEMPERATURE = 0.5;
const DEFAULT_URL = process.env.OPENAI_API_BASE ? process.env.OPENAI_API_BASE : 'https://api.openai.com/v1/completions';
const KEY = process.env.OPENAI_API_KEY;
const DEFAULT_SYSTEM_PROMPT = 'you are a helpful assistant';

export default async function chat(model, messages, temperature) {
    try {
        const res = await fetch(DEFAULT_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${KEY}`,
            },
            method: 'POST',
            body: JSON.stringify({
                model: model ? model : 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: DEFAULT_SYSTEM_PROMPT,
                    },
                     ...messages,
                ],
                max_tokens: 1000,
                temperature: temperature ? temperature : DEFAULT_TEMPERATURE,
                // stream: true,
            }),
        });
        return res;
    } catch (error) {
        console.error('Error in chat function:', error);
        throw error;
    }
}
