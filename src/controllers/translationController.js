const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const translateText = async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;

    if (!text || !targetLanguage) {
      return res.status(400).json({ message: 'Text and targetLanguage required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Translate the following text to ${targetLanguage}: ${text}`,
    });

    const translatedText = response.text.trim();

    return res.json({ translatedText });
  } catch (error) {
    console.error('Translation Error:', error);

    // check if headers already sent
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Failed to translate text' });
    }
  }
};

module.exports = { translateText };
