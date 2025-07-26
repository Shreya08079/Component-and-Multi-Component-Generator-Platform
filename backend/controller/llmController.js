const axios = require('axios');

// POST /api/llm/generate
// { prompt: string, code: string, mode: 'new' | 'patch', ... }
async function generateComponent(req, res) {
  try {
    const { prompt, code, mode } = req.body;
    // Compose prompt for LLM
    let fullPrompt = prompt;
    if (mode === 'patch' && code) {
      fullPrompt = `Given this code:\n${code}\nApply the following change: ${prompt}`;
    }
    // Call OpenRouter (replace API_KEY and model as needed)
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'meta-llama/llama-3-70b-instruct',
        messages: [
          { role: 'system', content: 'You are an expert React component generator.' },
          { role: 'user', content: fullPrompt }
        ],
        max_tokens: 2048
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );
    const llmOutput = response.data.choices[0].message.content;
    res.json({ code: llmOutput });
  } catch (err) {
    res.status(500).json({ message: 'LLM generation failed', error: err.message });
  }
}

module.exports = { generateComponent };
