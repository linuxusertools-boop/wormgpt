// api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { prompt, history } = req.body;

    const response = await fetch("https://perchance.org/api/getAiResponse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: prompt,
        systemPrompt: "Kamu adalah kevin, developer kecil kecilan",[span_5](start_span)[span_5](end_span)
        model: "gemini-1.5-flash",[span_6](start_span)[span_6](end_span)
        provider: "llm7",[span_7](start_span)[span_7](end_span)
        temperature: 2,[span_8](start_span)[span_8](end_span)
        history: history || []
      }),
    });

    const data = await response.text();
    res.status(200).json({ reply: data });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
