const { GoogleGenAI } = require("@google/genai");

// Helper function to generate AI Chat response via Google Gemini AI or Intelligent Mentor Fallback
const generateChatResponseWithGemini = async (userMessage) => {
  const apiKey = process.env.GEMINI_API_KEY;

  const systemInstruction = `
You are PrepPilot AI, an expert AI Career Coach, Senior Software Architect, and Tech Interview Mentor.
Your goal is to help candidates ace technical interviews, improve their software development skills, and provide clear, professional, and actionable advice.

Respond to the candidate's query clearly, politely, and concisely using markdown formatting where helpful.
Candidate Query: "${userMessage}"
`;

  if (apiKey && apiKey.trim() !== "") {
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
      const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: systemInstruction,
      });

      const replyText = response.text ? response.text.trim() : "";
      if (replyText) {
        return replyText;
      }
    } catch (geminiError) {
      console.error("Gemini Chat Error:", geminiError.message);
    }
  }

  return getFallbackChatReply(userMessage);
};

const getFallbackChatReply = (message) => {
  const msgLower = message.toLowerCase();

  if (msgLower.includes("jwt") || msgLower.includes("token")) {
    return "JSON Web Tokens (JWT) are an open standard (RFC 7519) used for securely transmitting information between a client and server as a JSON object. A JWT consists of three parts separated by dots: Header, Payload, and Signature.";
  }

  if (msgLower.includes("react") && msgLower.includes("angular")) {
    return "React is an open-source JavaScript library developed by Meta focusing on building component-based UIs using a Virtual DOM and one-way data binding. Angular is a full-fledged TypeScript framework developed by Google.";
  }

  return `PrepPilot AI Assistant: Thank you for your question regarding "${message}". To succeed in technical interviews, focus on core computer science fundamentals and building production-ready projects.`;
};

// Controller Function: AI Chat
const aiChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const reply = await generateChatResponseWithGemini(message.trim());

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("AI Chat Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error processing AI Chat.",
    });
  }
};

module.exports = {
  aiChat,
};
