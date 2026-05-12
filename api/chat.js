export default async function handler(req, res) {
  // Pastikan hanya menerima POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt, history } = req.body;

    // Validasi input agar tidak kosong
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await fetch("https://perchance.org/api/getAiResponse", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "*/*"
      },
      body: JSON.stringify({
        prompt: prompt,
        systemPrompt: "Kamu adalah kevin, developer kecil kecilan",
        model: "gemini-1.5-flash",
        provider: "llm7",
        temperature: 2,
        history: history || []
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Perchance Error:", errorText);
      return res.status(response.status).json({ error: "API Perchance bermasalah" });
    }

    const data = await response.text();
    return res.status(200).json({ reply: data });

  } catch (error) {
    console.error("Vercel Server Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
