import { GoogleGenAI } from "@google/genai";
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          { text: 'A dark, modern, abstract tech background with subtle glowing circuit lines and a deep blue/purple gradient. Suitable for an AI API gateway landing page. Minimalist, high quality, 16:9 aspect ratio, no text.' }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "2K"
        }
      }
    });
    
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        fs.writeFileSync(path.join(process.cwd(), 'public', 'hero-bg.jpg'), Buffer.from(part.inlineData.data, 'base64'));
        console.log('SUCCESS');
        return;
      }
    }
    console.log('NO IMAGE IN RESPONSE');
  } catch (e) {
    console.error('ERROR:', e);
  }
}

main();
