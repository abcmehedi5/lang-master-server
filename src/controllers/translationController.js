const { GoogleGenAI } = require("@google/genai");
const rateLimit = require("express-rate-limit");

// Gemini Init
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Maximum text length (safe limit)
const MAX_TEXT_LENGTH = 1000;

// Translation Function
const translateText = async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;

    // Input validation
    if (!text || !targetLanguage) {
      return res
        .status(400)
        .json({ message: "Text and targetLanguage required" });
    }

    // Length check
    if (text.length > MAX_TEXT_LENGTH) {
      return res.status(400).json({
        message: `Text too long. Please provide text under ${MAX_TEXT_LENGTH} characters.`,
      });
    }

    // Gemini API call with JSON enforced output
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        Translate the following text to ${targetLanguage}: ${text}.
        Return the result strictly in JSON format like this:
        {
          "original": "input text",
          "translations": [
            { "word": "Bengali word 1", "explanation": "meaning" },
            { "word": "Bengali word 2", "explanation": "meaning" }
          ],
          "bestFit": "best choice"
        }
      `,
    });

    let raw = response?.text
      ?.trim()
      .replace(/^```json\s*/, "")
      .replace(/\s*```$/g, "");

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.error("JSON parse failed:", e, "Raw response:", raw);
      return res
        .status(500)
        .json({ message: "Failed to parse translation result" });
    }
    return res.json(parsed);
  } catch (error) {
    console.error("Translation Error:", error);

    // Handle specific errors
    if (error.response?.status === 429) {
      return res.status(429).json({
        message: "API rate limit exceeded. Please wait and try again.",
      });
    }
    if (error.response?.status === 403) {
      return res
        .status(403)
        .json({ message: "Access denied. Invalid or expired API key." });
    }

    // Generic error
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ message: "Failed to translate text. Please try again." });
    }
  }
};

module.exports = { translateText };
