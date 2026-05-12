// api/chat.js
export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, history } = req.body;

    // Konfigurasi sesuai permintaanmu
    const payload = {
      prompt: prompt,
      systemPrompt: "Kamu adalah kevin, developer kecil kecilan", //[span_0](start_span)[span_0](end_span)
      model: "gemini-1.5-flash", //[span_1](start_span)[span_1](end_span)
      provider: "llm7", //[span_2](start_span)[span_2](end_span)
      temperature: 2, //[span_3](start_span)[span_3](end_span)
      history: history || []
    };

    const response = await fetch("https://perchance.org/api/getAiResponse", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Perchance API error: ${response.statusText}`);
    }

    const data = await response.text();
    return res.status(200).json({ reply: data });

  } catch (error) {
    console.error("Backend Error:", error);
    return res.status(500).json({ error: "Gagal memproses pesan." });
  }
}
