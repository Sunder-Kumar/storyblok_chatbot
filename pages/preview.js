import { useEffect, useState } from 'react';
import axios from 'axios';
import { render } from '@storyblok/rich-text-react-renderer';

export default function Preview() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    async function fetchFaqs() {
      const res = await axios.get('https://api.storyblok.com/v2/cdn/stories', {
        params: {
          starts_with: 'faq/',
          version: 'published', // IMPORTANT: Only show published content
          token: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
        },
      });

      const stories = res.data.stories;
      const cleaned = stories.map(story => ({
        title: story.content.title,
        body: story.content.body, // pass full body object
      }));
      setFaqs(cleaned);
    }

    fetchFaqs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center">📚 Public FAQ Preview</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="p-4 border rounded-lg bg-white shadow">
          <h2 className="text-xl font-semibold mb-2">{faq.title}</h2>
          <div className="prose">{render(faq.body)}</div>
        </div>
      ))}
    </div>
  );
}
