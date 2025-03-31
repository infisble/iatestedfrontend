const API_URL = "https://pythonapirepo.onrender.com/chat"; // 🔗 твой backend

export const enhanceText = async (text: string): Promise<string> => {
  if (!text.trim()) return text;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_input: text
      })
    });

    const data = await response.json();
    return data.response || text;
  } catch (err) {
    console.error('Error enhancing text:', err);
    return text;
  }
};

export const enhanceExperienceDescription = enhanceText;
