import { GoogleGenAI, Type } from "@google/genai";
import { Message } from "../types";
import i18n from "../i18n";

// Fallback key provided by the user in case environment variables are missing in their specific setup
const USER_API_KEY = "AIzaSyAdVh4Oe5rTuhzIXpm_pBx3IIRh2_d851o";

function getAiClient() {
  // Use the user-provided key as the primary source as requested
  const apiKey = USER_API_KEY || (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "undefined" ? process.env.GEMINI_API_KEY : "");
  return new GoogleGenAI({ apiKey });
}

export async function getGeminiResponse(messages: Message[], language: 'en' | 'bn') {
  const ai = getAiClient();
  const model = "gemini-1.5-flash"; // More widely available for free tier
  
  const baseSystemInstruction = i18n.t('systemPrompt', { lng: language });
  const languageInstruction = language === 'bn' 
    ? "OUTPUT LANGUAGE: BANGLA. You MUST use Bangla script (Bengali) for your entire response. Do not use English unless it is a specific technical term or untranslatable quote name." 
    : "OUTPUT LANGUAGE: ENGLISH.";
  
  const systemInstruction = `${baseSystemInstruction}\n\n${languageInstruction}`;
  
  // Prepare history and last message separately
  const history = messages.map(m => ({
    role: m.role,
    parts: [{ text: m.text }]
  }));

  // Gemini API requires the conversation to start with a 'user' message.
  // If the first message is from the 'model' (welcome message), skip it.
  let validHistory = history;
  if (validHistory.length > 0 && validHistory[0].role === 'model') {
    validHistory = validHistory.slice(1);
  }

  // If there are no messages left or the last one isn't from user, we can't generate a response.
  if (validHistory.length === 0 || validHistory[validHistory.length - 1].role !== 'user') {
    return "";
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: validHistory,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error: any) {
    console.error("Gemini API Error Detail:", error?.message || error);
    if (error?.message?.includes("API key not valid")) {
      return "Islamic Scholar is currently offline due to technical reasons. Please try again later. (Error: Invalid API Key)";
    }
    return i18n.t('errorMessage', { lng: language });
  }
}

export async function searchHadiths(query: string, language: 'en' | 'bn') {
  const ai = getAiClient();
  const model = "gemini-1.5-flash";
  
  const systemInstruction = `You are a Hadith researcher. Find 3-5 authentic Hadiths related to the following query: "${query}". 
  CRITICAL: You MUST provide the research results in ${language === 'en' ? 'English' : 'Bangla (Bengali) using Bangla script'}. All text fields in the JSON response MUST be exclusively in ${language === 'en' ? 'English' : 'Bangla'}.
  Return the results ONLY as a JSON array where each object has these fields: id, text, source, narrator, theme.
  Do not include markdown code blocks.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: `Search hadiths for: ${query}` }] }],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING },
              source: { type: Type.STRING },
              narrator: { type: Type.STRING },
              theme: { type: Type.STRING }
            },
            required: ["id", "text", "source", "narrator", "theme"]
          }
        }
      }
    });

    const text = response.text?.trim() || "[]";
    // Handle potential markdown formatting just in case
    const cleanedText = text.replace(/^```json\s*|```$/g, '');
    return JSON.parse(cleanedText);
  } catch (error: any) {
    console.error("Hadith Search Error Detail:", error?.message || error);
    return [];
  }
}
