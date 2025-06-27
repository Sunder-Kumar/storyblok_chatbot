import axios from 'axios';
import { getFaqContent } from '../../lib/storyblok';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { question } = req.body;
  const faqs = await getFaqContent();

  const customQA = [
  {
    question: 'Who designed you?',
    answer: 'I was designed by Sunder Kumar, who crafted my interface and user experience to assist you effectively.',
  },
  {
    question: 'Who is Sunder Kumar?',
    answer: 'He is a passionate Computer Science Engineer with a strong foundation in software development, automation, and modern web technologies.',
  },
];



  const context = `${customQA}\n\n${faqs.map(f => `**${f.title}**:\n${f.body}`).join('\n\n')}`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: `
You are an AI customer support assistant trained using the following FAQs:

${context}

Guidelines:
- Answer ONLY using the information in the FAQs.
- Keep the response short and helpful (2–4 lines max).
- Use Markdown formatting: bullet points, **bold**, etc.
- Do NOT repeat titles or add extra explanations.
- If unsure, say "I'm not sure. Please contact support."
            `.trim(),
          },
          {
            role: 'user',
            content: question,
          },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ answer: response.data.choices[0].message.content });
  } catch (err) {
    console.error('OpenRouter Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch from OpenRouter' });
  }
}
