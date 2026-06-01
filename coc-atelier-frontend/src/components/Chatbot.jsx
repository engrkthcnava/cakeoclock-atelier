import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

// ==========================================
// STATIC BAKERY MENU CONTEXT FOR GEMINI
// ==========================================
const BAKERY_MENU = `
You are the friendly, charming, and helpful AI Pastry Assistant for Cake o' Clock Atelier. 
Use this exact real-time menu to answer customer questions accurately. Always be welcoming and enthusiastic about our baked goods!
If a customer asks for a pastry or flavor that is not on this list, politely inform them it isn't on the menu today but offer to recommend a close alternative from below.

Our Current Pastry Menu:

1. CRIMSON KISS
   - Description: Velvety Red Velvet Crinkles with White Chocolate Pockets.
   - Price: ₱180

2. THE DOUBLE TAKE
   - Description: The Ultimate Hybrid of Fudgy Brownie and Classic Cookie.
   - Price: ₱240

3. FUDGE ECLIPSE
   - Description: Rich, Ultra-Fudgy Dark Chocolate Brownie Squares.
   - Price: ₱220

4. SCARLET ROYALE
   - Description: Elegant Red Velvet Cake Layered with Smooth Cream Cheese.
   - Price: ₱500

5. VOLCANIC BUTTERNUT
   - Description: Decadent Chocolate Lava Cake with a Rich Butternut Twist.
   - Price: ₱120

6. BANANA CRUNCHWAVE
   - Description: Moist Banana Sponge Layered with Crunchy Oreo Elements.
   - Price: ₱140

7. MIDNIGHT SYMPHONY
   - Description: A Luxurious and Deeply Decadent Pure Chocolate Cake.
   - Price: ₱350

8. DESERT GOLD
   - Description: Gourmet Decadence Inspired by Exotic Dubai Decadence.
   - Price: ₱120

9. CHIPSTORM
   - Description: Crisp chocolate chip cookies baked to golden perfection.
   - Price: ₱125

10. WALNUT WHIRL
    - Description: Chocolate chip walnut cookies with rich buttery crunch.
    - Price: ₱135

11. MATCHA MYSTIQUE
    - Description: Delicate matcha cookies with a soft, fragrant finish.
    - Price: ₱145

12. DOUBLE TROUBLE
    - Description: Extra fudgy double chocolate cookies for chocoholics.
    - Price: ₱145
`;

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! Welcome to Cake o' Clock Atelier. How can I sweeten your day?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Auto-scrolls the chat module to the newest message bubble
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userText = inputText;
    setInputText('');
    
    // Append the user's chat bubble to the UI
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsLoading(true);

    try {
      // Relative routing works flawlessly on your unified single Vercel deployment
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userText,
          menuContext: BAKERY_MENU // Pass the clean static layout straight to your Gemini endpoint
        })
      });

      if (!response.ok) throw new Error('Network error');

      const data = await response.json();
      
      // Append the Gemini AI assistant's reply bubble to the UI
      setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: "I'm having a little trouble connecting to the kitchen right now. Please try again in a moment!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* FLOATING ACTION TOGGLE BUTTON */}
      <button className="chat-fab" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '💬'}
      </button>

      {/* CHAT POPUP WINDOW INTERFACE */}
      {isOpen && (
        <div className="chat-window">
          {/* HEADER LAYER */}
          <div className="chat-header">
            <div className="chat-avatar">🧁</div>
            <div>
              <h3>Pastry Assistant</h3>
              <p>Cake o' Clock Atelier AI</p>
            </div>
          </div>

          {/* SCROLLABLE DIALOGUE ARENA */}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-row ${msg.sender}`}>
                {msg.sender === 'bot' && <span className="bot-mini-avatar">👩‍🍳</span>}
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}
            
            {/* LOADING THREAD SKELETON ANIMATION */}
            {isLoading && (
              <div className="message-row bot">
                <span className="bot-mini-avatar">👩‍🍳</span>
                <div className="message-bubble typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* CHAT SUBMISSION FOOTER */}
          <form className="chat-footer" onSubmit={handleSendMessage}>
            <input 
              type="text" 
              placeholder="Ask me about our cakes or prices..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !inputText.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbot;