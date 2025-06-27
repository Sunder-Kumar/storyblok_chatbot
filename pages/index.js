import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function FloatingChatBot() {
  const [question, setQuestion] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const askBot = async () => {
    if (!question.trim()) return;

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

  // Show chatbot only if URL contains ?from=ai-helper
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('from') !== 'ai-helper') {
      return null; // Do not render chatbot if special link not used
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        🤖
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 max-h-[80vh] bg-white border rounded-lg shadow-lg flex flex-col p-4 z-50">
          <h2 className="text-lg font-semibold mb-2">Storyblok AI Assistant</h2>
          <div className="flex-1 overflow-y-auto space-y-3 mb-2">
            {chat.map((c, i) => (
              <div key={i} className="bg-gray-100 p-2 rounded">
                <p><strong>You:</strong> {c.q}</p>
                <p><strong>Bot:</strong></p>
                <div className="text-gray-800 whitespace-pre-wrap">
                  <ReactMarkdown>{c.a}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2">
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
      )}
    </>
  );
}
