import { useState } from 'react'

function App() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, timestamp: new Date() }])
      setInputMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-white flex items-center justify-center">
            <span className="text-purple-400 mr-2">👻</span>
            SpiritSpeak
            <span className="text-purple-400 ml-2">🔮</span>
          </h1>
          <p className="text-purple-200 text-center mt-2">Connect with the mystical realm</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Welcome Card */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-purple-300 border-opacity-30">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Welcome to the Spirit Realm
              </h2>
              <p className="text-purple-200 mb-6">
                A mystical communication platform where spirits and souls connect across dimensions.
              </p>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl">✨</span>
                  </div>
                  <span className="text-sm text-purple-200">Mystical</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl">🌙</span>
                  </div>
                  <span className="text-sm text-purple-200">Ethereal</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl">🔮</span>
                  </div>
                  <span className="text-sm text-purple-200">Spiritual</span>
                </div>
              </div>
            </div>
          </div>

          {/* Message Display */}
          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl p-6 mb-6 border border-purple-300 border-opacity-30 min-h-[300px]">
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
              <span className="text-purple-400 mr-2">💬</span>
              Spirit Messages
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-purple-300 text-center py-8 italic">
                  The spirit realm awaits your first message...
                </p>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className="bg-purple-900 bg-opacity-50 rounded-lg p-3 border-l-4 border-purple-400">
                    <p className="text-white">{message.text}</p>
                    <p className="text-purple-300 text-xs mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Message Input */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 border border-purple-300 border-opacity-30">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Channel your spiritual message..."
                className="flex-1 bg-black bg-opacity-50 text-white placeholder-purple-300 rounded-lg px-4 py-3 border border-purple-500 border-opacity-50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
              >
                Send 🚀
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-6 py-4 text-center">
          <p className="text-purple-300 text-sm">
            Built with React + Vite + Tailwind CSS ✨ | Where technology meets mysticism
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
