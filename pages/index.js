import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, MessageCircle } from 'lucide-react';
import '../styles/globals.css';

export default function Index() {
  console.log('Index component rendering...');
  
  const [question, setQuestion] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const askBot = async () => {
    console.log('askBot called with question:', question);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      const data = await res.json();
      setChat([...chat, { q: question, a: data.answer }]);
      setQuestion('');
    } catch (error) {
      console.error('Error calling API:', error);
      // For demo purposes, add a mock response
      setChat([...chat, { q: question, a: 'This is a demo response since the API is not available.' }]);
      setQuestion('');
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading && question.trim()) {
      askBot();
    }
  };

  console.log('Current chat state:', chat);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Main Content Area */}
      <div className="w-2/3 p-8 lg:p-12">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Welcome to Storyblok Help
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Need help? Ask our AI chatbot on the right for instant assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-lg">
              <div className="flex items-center mb-3">
                <MessageCircle className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold">Smart Conversations</h3>
              </div>
              <p className="text-gray-600">
                Get instant answers about Storyblok features, API documentation, and best practices.
              </p>
            </div>

            <div className="p-6 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-lg">
              <div className="flex items-center mb-3">
                <Bot className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold">24/7 Support</h3>
              </div>
              <p className="text-gray-600">
                Our AI assistant is always available to help you with your Storyblok questions.
              </p>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-slate-200/50">
            <h3 className="text-lg font-semibold mb-3">How to get started:</h3>
            <ol className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">1</span>
                Type your question in the chat sidebar
              </li>
              <li className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">2</span>
                Press Enter or click Send
              </li>
              <li className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">3</span>
                Get your instant AI-powered response
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      <div className="w-1/3 bg-white border-l border-slate-200 flex flex-col shadow-xl">
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center mb-2">
            <Bot className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">🤖 Storyblok AI Chatbot</h2>
          </div>
          <p className="text-sm text-gray-600">Ask me anything about Storyblok!</p>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {chat.length === 0 ? (
              <div className="text-center py-8">
                <Bot className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Start a conversation by asking a question below!</p>
              </div>
            ) : (
              chat.map((c, i) => (
                <div key={i} className="space-y-3">
                  {/* User Question */}
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-gray-800">{c.q}</p>
                    </div>
                  </div>

                  {/* Bot Answer */}
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                      <Bot className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 max-w-[80%]">
                      <div className="text-gray-800 whitespace-pre-wrap text-sm prose prose-sm max-w-none">
                        <ReactMarkdown>{c.a}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {loading && (
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                  <Bot className="h-4 w-4 text-green-600" />
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-200 bg-gray-50">
          <div className="flex space-x-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question..."
              disabled={loading}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={askBot}
              disabled={loading || !question.trim()}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send • {loading ? "Thinking..." : "AI responses powered by Storyblok"}
          </p>
        </div>
      </div>
    </div>
  );
}
