// pages/preview.js

import { useEffect, useState } from 'react';

export default function Preview() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const res = await fetch(
          `https://api.storyblok.com/v2/cdn/stories?version=published&starts_with=faq/&token=${process.env.NEXT_PUBLIC_STORYBLOK_TOKEN}`
        );
        const data = await res.json();

        const cleaned = data.stories.map((story) => ({
          title: story.content.title,
          body:
            story.content.body?.content
              ?.map((block) => block.content?.[0]?.text || '')
              .join('\n') || '',
        }));

        setFaqs(cleaned);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
        setLoading(false);
      }
    }

    fetchFaqs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">
          📖 Published FAQs
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading FAQs...</p>
        ) : faqs.length === 0 ? (
          <p className="text-red-500">No published FAQs found.</p>
        ) : (
          faqs.map((faq, i) => (
            <div key={i} className="mb-6 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {faq.title}
              </h2>
              <p className="text-gray-700 mt-2 whitespace-pre-line">
                {faq.body}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
