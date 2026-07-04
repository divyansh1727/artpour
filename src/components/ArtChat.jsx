import React, { useState } from 'react';

export default function ArtChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I am your PourByKay assistant. How can I help you find the perfect art piece today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Using a hardcoded userId for testing memory persistence across refreshes
  const userId = "test-user-kay-123"; 

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      // Points directly to your Express backend endpoint
      const response = await fetch('http://localhost:5000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId, userMessage: userMsg })
});
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Oops, my paintbrushes got tangled. Try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, fontFamily: 'sans-serif' }}>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{ padding: '12px 20px', backgroundColor: '#e91e63', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', fontWeight: 'bold' }}
        >
          💬 Chat with Art Assistant
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{ width: '320px', height: '400px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #eee' }}>
          {/* Header */}
          <div style={{ backgroundColor: '#e91e63', color: 'white', padding: '12px', display: 'flex', justifyContent: 'between', alignItems: 'center', fontWeight: 'bold' }}>
            <span>PourByKay Assistant</span>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '16px', marginLeft: 'auto' }}>✕</button>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', backgroundColor: msg.role === 'user' ? '#e91e63' : '#f1f1f1', color: msg.role === 'user' ? 'white' : '#333', padding: '8px 12px', borderRadius: '12px', maxWidth: '80%', fontSize: '14px', lineHeight: '1.4' }}>
                {msg.text}
              </div>
            ))}
            {loading && <div style={{ alignSelf: 'flex-start', color: '#888', fontSize: '12px' }}>Assistant is thinking...</div>}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid #eee', padding: '8px' }}>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask about items or styles..." 
              style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px', outline: 'none' }}
            />
            <button type="submit" style={{ marginLeft: '6px', padding: '8px 12px', backgroundColor: '#e91e63', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}