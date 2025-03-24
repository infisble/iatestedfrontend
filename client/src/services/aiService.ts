const IO_API_KEY  = 'io-v2-eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6ImI4OTczMjQzLTJiOGUtNGViMi05ZGI2LTQ2ZTAyZGM4Zjg2ZSIsImV4cCI6NDg5NjM3MzUxMX0.R_1fS1KhdIAuxgVhc2Fi1Vwrkbe89wbo75KBy0YGPUkeOmxQYxl1IwiTPBzGJqvMd0_tc3TzROgaV5FjD2Me2A';
const BASE_URL = 'https://api.intelligence.io.solutions/api/v1/chat/completions';
const headers = {
  'Content-Type': 'application/json',
  Authorization: IO_API_KEY
};

export const enhanceText = async (text: string): Promise<string> => {
  if (!text.trim()) return text;

  const payload = {
    model: 'meta-llama/Llama-3.3-70B-Instruct',
    messages: [
      {
        role: 'system',
        content:
          'You are a professional resume writer. Your task is to enhance the given text to be more impactful and professional. Remove first-person pronouns, use active voice, and include specific achievements where possible. Keep the core information but make it more compelling.'
      },
      {
        role: 'user',
        content: text
      }
    ],
    temperature: 0.7,
    max_tokens: 200
  };

  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`API error: ${res.statusText}`);

    const data = await res.json();
    const enhancedText = data.choices?.[0]?.message?.content;

    return enhancedText?.trim() || text;
  } catch (err) {
    console.error('Error enhancing text with IO API:', err);
    return text;
  }
};

export const enhanceExperienceDescription = async (description: string): Promise<string> => {
  if (!description.trim()) return description;

  const payload = {
    model: 'meta-llama/Llama-3.3-70B-Instruct',
    messages: [
      {
        role: 'system',
        content:
          'You are a professional resume writer. Your task is to enhance the given work experience description to be more impactful. Use active voice, strong action verbs, and include specific achievements. Focus on quantifiable results and impact.'
      },
      {
        role: 'user',
        content: description
      }
    ],
    temperature: 0.7,
    max_tokens: 200
  };

  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`API error: ${res.statusText}`);

    const data = await res.json();
    const enhanced = data.choices?.[0]?.message?.content;

    return enhanced?.trim() || description;
  } catch (err) {
    console.error('Error enhancing experience with IO API:', err);
    return description;
  }
};