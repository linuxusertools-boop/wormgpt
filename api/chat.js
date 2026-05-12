export default async function handler(req, res) {
  // Hanya izinkan POST agar endpoint tidak disalahgunakan
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt, history } = req.body;

    const response = await fetch("https://perchance.org/api/getAiResponse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: prompt,
        systemPrompt: "Kamu adalah kevin, developer kecil kecilan",
        model: "gemini-1.5-flash",
        provider: "llm7",
        temperature: 2,
        history: history || []
      }),
    });

    if (!response.ok) throw new Error("Gagal mengambil respon dari Perchance");

    const data = await response.text();
    return res.status(200).json({ reply: data });

  } catch (error) {
    console.error("Backend Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
