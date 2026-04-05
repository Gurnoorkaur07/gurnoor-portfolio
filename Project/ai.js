// You will need an OpenAI API key to use GPT features
const OPENAI_API_KEY = "YOUR_API_KEY_HERE";

async function aiCategorize(description) {
  const prompt = `Categorize this expense: "${description}" into Food, Rent, Entertainment, Travel, or Others. Return only the category.`;
  return await callOpenAI(prompt);
}

async function aiSpendingInsights(transactions) {
  const prompt = `Here are my transactions: ${JSON.stringify(transactions)}. Give me a short human-like insight about my spending habits this month.`;
  return await callOpenAI(prompt);
}

async function aiChat(question, transactions) {
  const prompt = `You are my finance assistant. Here are my transactions: ${JSON.stringify(transactions)}. Answer this question: ${question}`;
  return await callOpenAI(prompt);
}

async function callOpenAI(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content.trim();
}
