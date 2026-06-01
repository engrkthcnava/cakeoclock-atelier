import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const BAKERY_MENU = `
You are the friendly, charming, and helpful AI Pastry Assistant for Cake o' Clock Atelier. 
Use this exact real-time menu to answer customer questions accurately. Always be welcoming!

Our Current Pastry Menu:
1. CRIMSON KISS - Velvety Red Velvet Crinkles with White Chocolate Pockets (₱180)
2. THE DOUBLE TAKE - The Ultimate Hybrid of Fudgy Brownie and Classic Cookie (₱240)
3. FUDGE ECLIPSE - Rich, Ultra-Fudgy Dark Chocolate Brownie Squares (₱220)
4. SCARLET ROYALE - Elegant Red Velvet Cake Layered with Smooth Cream Cheese (₱500)
5. VOLCANIC BUTTERNUT - Decadent Chocolate Lava Cake with a Rich Butternut Twist (₱120)
6. BANANA CRUNCHWAVE - Moist Banana Sponge Layered with Crunchy Oreo Elements (₱140)
7. MIDNIGHT SYMPHONY - A Luxurious and Deeply Decadent Pure Chocolate Cake (₱350)
8. DESERT GOLD - Gourmet Decadence Inspired by Exotic Dubai Decadence (₱120)
9. CHIPSTORM - Crisp chocolate chip cookies baked to golden perfection (₱125)
10. WALNUT WHIRL - Chocolate chip walnut cookies with rich buttery crunch (₱135)
11. MATCHA MYSTIQUE - Delicate matcha cookies with a soft, fragrant finish (₱145)
12. DOUBLE TROUBLE - Extra fudgy double chocolate cookies for chocoholics (₱145)

Scope Guidelines:
- You CAN answer conversational, text-style general questions if they relate to bakeries, pastry pairings, cake care, or celebrations (e.g., "What cake goes best with coffee?", "How should I store my chocolate cake?", "Do you have any recommendation for a birthday?").
- If asked about items or services completely out of scope (e.g., coding, weather, savory meals), politely steer them back to our menu and sweet treats.
`;

// Pre-defined clickable FAQs for the customer
const FAQ_SUGGESTIONS = [
  "What is your best seller?",
  "Do you have red velvet?",
  "What can you recommend for chocolate lovers?",
  "How much is the Scarlet Royale?"
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! Welcome to Cake o' Clock Atelier. How can I sweeten your day?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFAQs, setShowFAQs] = useState(true); // Toggle to show/hide pills
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Unified sending logic
  const sendMessageToServer = async (textToSend) => {
    if (!textToSend.trim()) return;
    
    setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    setIsLoading(true);
    setShowFAQs(false); // Hide the suggestion buttons after interaction starts

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: textToSend,
          menuContext: BAKERY_MENU 
        })
      });

      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
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

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (isLoading || !inputText.trim()) return;
    const text = inputText;
    setInputText('');
    sendMessageToServer(text);
  };

  return (
    <div className="chatbot-wrapper">
      <button className="chat-fab" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar">🧁</div>
            <div>
              <h3>Pastry Assistant</h3>
              <p>Bean n' Bite AI</p>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-row ${msg.sender}`}>
                {msg.sender === 'bot' && <span className="bot-mini-avatar">👩‍🍳</span>}
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}
            
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

          {/* QUICK CHAT SUGGESTIONS / FAQS CONTAINER */}
          {showFAQs && !isLoading && (
            <div className="faq-container">
              {FAQ_SUGGESTIONS.map((faq, index) => (
                <button 
                  key={index} 
                  type="button" 
                  className="faq-pill"
                  onClick={() => sendMessageToServer(faq)}
                >
                  {faq}
                </button>
              ))}
            </div>
          )}

          <form className="chat-footer" onSubmit={handleSubmitForm}>
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