
import { GoogleGenAI, Type } from "@google/genai";
import { PhaseConfig, IdentityConfig, ChatMessage } from "../types";

export const getGeminiResponse = async (
  phase: PhaseConfig,
  identity: IdentityConfig,
  history: ChatMessage[],
  userInput: string
): Promise<string> => {
  // Always initialize with a configuration object containing the API key from process.env
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  try {
    // Direct call to ai.models.generateContent with model name and contents
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents,
      config: {
        systemInstruction: `你是${identity.persona}，当前处于唐朝的${phase.name}时期。
          
          ${identity.systemPrompt}
          
          当前历史背景：${phase.historicalContext}
          当前物价参考：${phase.prices}
          
          核心戒律：
          1. 绝对严禁使用任何现代词汇（如：系统、UI、AI、回复、指令、功能、选项）。
          2. 回复必须带有浓厚的身份色彩。
          3. 字数控制在150字以内（绝不超过300字）。
          4. 如果用户提到现代事物，请表达出完全的困惑或将其理解为某种神迹或疯言。`,
        temperature: 0.8,
        // When maxOutputTokens is set, thinkingBudget should also be defined to reserve response tokens
        maxOutputTokens: 600,
        thinkingConfig: { thinkingBudget: 100 }
      }
    });
    
    // Use response.text getter directly (not a function)
    return response.text || "时空静默...";
  } catch (error) {
    return "星象紊乱，传音未达。";
  }
};

export const generateHistoricalReport = async (phase: PhaseConfig, identity: IdentityConfig): Promise<{ title: string; date: string; content: string[] }> => {
  // Always initialize with a configuration object
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `为唐朝${phase.name}时期生成一份邸报。
    身份背景：你是${identity.title}。
    内容需包含：当时的大事记、该身份关注的市井新闻、物价感受。
    返回格式必须是JSON：{"title": "古风标题", "date": "${phase.yearRange}", "content": ["段落1", "段落2", "段落3"]}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: { 
        responseMimeType: "application/json",
        // Recommended way to configure responseSchema for expected JSON output
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            date: { type: Type.STRING },
            content: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          propertyOrdering: ["title", "date", "content"]
        }
      }
    });
    // Ensure response.text is treated as a string before parsing; do not call as a function
    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    return {
      title: phase.newsTitle,
      date: phase.yearRange,
      content: ["时空节点解析失败...", phase.historicalContext]
    };
  }
};
