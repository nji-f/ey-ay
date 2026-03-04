const axios = require('axios');

module.exports = async function handler(req, res) {
    // Vercel Serverless Function
    const text = req.query.text || (req.body && req.body.text);

    if (!text) {
        return res.status(400).json({ 
            reply: "👀 *GEMINI AI*\n\n> Masukkan pertanyaan\n\nContoh: Hai apa kabar?" 
        });
    }

    try {
        const url = `https://api.nexray.web.id/ai/gemini?text=${encodeURIComponent(text)}`;
        const { data } = await axios.get(url, { timeout: 60000 });
        const chat = data.result;

        if (!chat || chat === "") {
            return res.status(200).json({ reply: "Aku lagi gak bisa jawab pertanyaan itu, coba ganti pertanyaan lagi" });
        }

        return res.status(200).json({ reply: chat });
        
    } catch (error) {
        return res.status(500).json({ reply: `❌ *ERROR*\n\n> ${error.message}` });
    }
}
