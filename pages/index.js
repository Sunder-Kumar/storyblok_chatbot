// pages/index.js (Option A: Sidebar Chat Layout)
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function SidebarChat() {
  const [question, setQuestion] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const askBot = async () => {
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    setChat([...chat, { q: question, a: data.answer }]);
    setQuestion('');
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-2/3 p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Storyblok Help</h1>
        <p className="text-gray-700">Need help? Ask our AI chatbot on the right.</p>
      </div>
      <div className="w-1/3 p-4 bg-gray-50 border-l">
        <h2 className="text-xl font-semibold mb-4">🤖 Storyblok AI Chatbot</h2>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          {chat.map((c, i) => (
            <div key={i} className="bg-white p-4 rounded shadow">
              <p><strong>You:</strong> {c.q}</p>
              <p><strong>Bot:</strong></p>
              <div className="text-gray-800 whitespace-pre-wrap">
                <ReactMarkdown>{c.a}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <input
            type="text"
            className="border w-full p-2"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question..."
          />
          <button
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded w-full"
            onClick={askBot}
            disabled={loading}
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
