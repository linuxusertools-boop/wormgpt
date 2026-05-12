export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });[span_3](start_span)[span_3](end_span)
  }

  try {
    const { prompt, history } = req.body;

    // Payload sesuai permintaan user: LLM7, Gemini 1.5 Flash, Temp 2
    const payload = {
      prompt: prompt,
      systemPrompt: "Kamu adalah kevin, developer kecil kecilan",[span_4](start_span)[span_4](end_span)
      model: "gemini-1.5-flash",[span_5](start_span)[span_5](end_span)
      provider: "llm7",[span_6](start_span)[span_6](end_span)
      temperature: 2,[span_7](start_span)[span_7](end_span)
      maxTokens: "auto",[span_8](start_span)[span_8](end_span)
      history: history || []
    };

    const response = await fetch("https://perchance.org/api/getAiResponse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);[span_9](start_span)[span_9](end_span)
    }

    const data = await response.text();
    return res.status(200).json({ reply: data });[span_10](start_span)[span_10](end_span)

  } catch (error) {
    console.error("Backend Error:", error);
    return res.status(500).json({ error: "Gagal memproses permintaan AI." });[span_11](start_span)[span_11](end_span)
  }
}
