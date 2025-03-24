const API_URL =
  import.meta.env.PROD
    ? 'https://aitestedserver.onrender.com/api/enhance-text'
    : '/api/enhance-text';

/**
 * Enhance general text (e.g. profile, summary)
 */
export const enhanceText = async (text: string): Promise<string> => {
  if (!text.trim()) return text;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        systemPrompt:
          'You are a professional resume writer. Your task is to enhance the given text to be more impactful and professional. Remove first-person pronouns, use active voice, and include specific achievements where possible. Keep the core information but make it more compelling.'
      })
    });

    const data = await response.json();
    return data.result || text;
  } catch (err) {
    console.error('Error enhancing text:', err);
    return text;
  }
};

/**
 * Enhance a job/experience description
 */
export const enhanceExperienceDescription = async (description: string): Promise<string> => {
  if (!description.trim()) return description;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: description,
        systemPrompt:
          'You are a professional resume writer. Your task is to enhance the given work experience description to be more impactful. Use active voice, strong action verbs, and include specific achievements. Focus on quantifiable results and impact.'
      })
    });

    const data = await response.json();
    return data.result || description;
  } catch (err) {
    console.error('Error enhancing experience:', err);
    return description;
  }
};
