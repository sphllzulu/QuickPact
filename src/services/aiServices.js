import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Store this in a .env file
  dangerouslyAllowBrowser: true // Only for development
});

export async function generateContractWithAI(summary, contractType) {
  try {
    const prompt = `Create a legally formatted ${contractType} contract based on this summary: ${summary}. Format it with markdown headings and sections.`;
    
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a legal assistant that drafts professional contracts.' },
        { role: 'user', content: prompt }
      ],
      model: 'gpt-3.5-turbo',
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating contract:', error);
    return 'Error generating contract. Please try again.';
  }
}