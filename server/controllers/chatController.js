import { GoogleGenAI } from '@google/genai';
import axios from 'axios';
import FormData from "form-data";

export const handleChat = async (req, res) => {
  try {
    const { userId, userMessage } = req.body;

    // 1. Initialize Gemini using the updated key env variable
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const COGNEE_URL = 'https://tenant-db71a096-85e5-40aa-b5aa-c8d6e6322a8d.aws.cognee.ai';
    const COGNEE_KEY = process.env.COGNEE_API_KEY || '1c96eed370479144477ee70ac749f567ab223dce2a6982c7b41ba525bfc54dc2'; 
    const TENANT_ID = 'db71a096-85e5-40aa-b5aa-c8d6e6322a8d';

    // --- 2. ASK COGNEE FOR LONG-TERM MEMORY ---
    // --- 2. ASK COGNEE FOR LONG-TERM MEMORY ---
let userHistory = "";

try {
  console.log(`[DEBUG] Attempting Cognee Recall at: ${COGNEE_URL}/api/v1/recall`);

  const cogneeResponse = await axios.post(
    `${COGNEE_URL}/api/v1/recall`,
    {
  query: `Tell me everything you know about user ${userId}.`,
  datasetName: "user_preferences"
},
    {
      headers: {
        "X-Api-Key": COGNEE_KEY,
        "X-Tenant-Id": TENANT_ID,
        "Content-Type": "application/json"
      }
    }
  );

  console.log("========== COGNEE RECALL ==========");
  console.dir(cogneeResponse.data, { depth: null });
  console.log("===================================");

  userHistory =
    typeof cogneeResponse.data === "object"
      ? JSON.stringify(cogneeResponse.data, null, 2)
      : cogneeResponse.data;

  console.log("Cognee memory recalled successfully! ✅");

} catch (err) {
  console.log("Cognee recall notice:", err.response?.data || err.message);
  userHistory = "No previous memory found.";
}

    // --- 3. COMBINE MEMORY WITH THE CURRENT MESSAGE FOR GEMINI ---
    const systemPrompt = `
      You are a friendly, helpful AI shopping assistant for "Handmade Art & Craft by PourByKay", owned by artist Kaveri Verma.
      Our catalog includes unique handcrafted items like: Personal Polaroids, Birthday Hampers, Phone Charms, Customised Phone Covers, Love Letters, Galaxy Wall Clocks, and Karan Aujla Phone Cases.
      
      Customer Memory Retrieved From Cognee:

${userHistory}

Instructions:
- If memory exists, greet the customer as a returning customer.
- Mention products they previously liked.
- Never say "I don't know your preferences" if memory contains them.
- Personalize recommendations using the retrieved memory.

      Use this memory to personalize your answers. If they return in a new session, acknowledge what they liked before!
    `;

    const geminiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser says: ${userMessage}` }] }
      ]
    });

    const aiReply = geminiResponse.text;

    // --- 4. EXTRACT NEW INTERESTS AND TELL COGNEE TO REMEMBER ---
    // --- 4. EXTRACT NEW INTERESTS AND TELL COGNEE TO REMEMBER ---
    // --- 4. EXTRACT NEW INTERESTS AND TELL COGNEE TO REMEMBER ---
    // --- 4. EXTRACT NEW INTERESTS AND TELL COGNEE TO REMEMBER ---
    // --- 4. EXTRACT NEW INTERESTS AND TELL COGNEE TO REMEMBER ---
    // --- 4. SAVE USER PREFERENCES TO COGNEE ---
// ---------- SAVE USER PREFERENCES ----------
const lowerMessage = userMessage.toLowerCase();

if (
  lowerMessage.includes("like") ||
  lowerMessage.includes("love") ||
  lowerMessage.includes("buy") ||
  lowerMessage.includes("want") ||
  lowerMessage.includes("prefer") ||
  lowerMessage.includes("favorite")
) {
  try {
    console.log("[DEBUG] Saving memory to Cognee...");

    const form = new FormData();

    const memory = `
User Profile

User ID: ${userId}

Customer Preference:
${userMessage}

This is a long-term customer preference.
Remember it for future shopping recommendations.
`;

    form.append(
      "data",
      Buffer.from(memory, "utf8"),
      {
        filename: "memory.txt",
        contentType: "text/plain",
      }
    );

    form.append("datasetName", "user_preferences");

    const response = await axios.post(
      `${COGNEE_URL}/api/v1/remember`,
      form,
      {
        headers: {
          ...form.getHeaders(),
          "X-Api-Key": COGNEE_KEY,
          "X-Tenant-Id": TENANT_ID,
        },
      }
    );

    console.log("========== COGNEE REMEMBER ==========");
    console.dir(response.data, { depth: null });
    console.log("=====================================");

  } catch (err) {
    console.error("Cognee Remember Error:");
    console.error(err.response?.status);
    console.error(err.response?.data || err.message);
  }
}
    // --- 5. SEND RESPONSE BACK TO REACT ---
    res.json({ reply: aiReply });

  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Something went wrong in the chat brain." });
  }
};