
import { GoogleGenAI, Type } from "@google/genai";
import { Devotional, DayPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateReflectionForDay = async (plan: DayPlan): Promise<Devotional> => {
  const readingDescription = plan.segments 
    ? plan.segments.map(s => `${s.book} ${s.startChapter}-${s.endChapter}`).join(', ')
    : `Antigo Testamento: ${plan.ot?.book} ${plan.ot?.startChapter}-${plan.ot?.endChapter}, Sapiencial: ${plan.sapiential?.book} ${plan.sapiential?.startChapter}, Novo Testamento: ${plan.nt?.book} ${plan.nt?.startChapter}-${plan.nt?.endChapter}`;

  const prompt = `Gere uma reflexão bíblica para o dia ${plan.day} de um plano de leitura anual.
  A leitura de hoje consiste em: ${readingDescription}
  
  Escolha um versículo chave de qualquer uma dessas passagens e crie uma reflexão curta e inspiradora em português. Não inclua oração, apenas a reflexão.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          verse: { type: Type.STRING },
          reference: { type: Type.STRING },
          reflection: { type: Type.STRING },
        },
        required: ["verse", "reference", "reflection"],
      },
    },
  });

  const text = response.text;
  try {
    if (!text) throw new Error("AI returned empty text content");
    return JSON.parse(text.trim());
  } catch (error) {
    return {
      verse: "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.",
      reference: "Salmo 119:105",
      reflection: "A palavra de Deus nos guia em cada passo de nossa jornada diária, trazendo clareza e esperança para o nosso coração."
    };
  }
};

export const explainChapter = async (bookName: string, chapter: number): Promise<string> => {
  const prompt = `Explique o capítulo ${chapter} do livro de ${bookName} da Bíblia. Forneça um resumo conciso e lições práticas em português.`;
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  return response.text || "Não foi possível gerar uma explicação no momento.";
};

export const chatWithBibleAI = async (messages: {role: string, content: string}[], userQuery: string) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'Você é um assistente bíblico sábio. Ajude o usuário com dúvidas sobre o plano de leitura de 365 dias.',
    },
    history: messages.map(m => ({
      role: m.role as 'user' | 'model',
      parts: [{ text: m.content }]
    }))
  });
  const response = await chat.sendMessage({ message: userQuery });
  return response.text || '';
};
