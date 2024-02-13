import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Make sure to import the CSS file
import { ClipLoader } from 'react-spinners'; // Assuming you're using react-spinners for the spinner

function Chatbot() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleLinkChange = () => {
    window.location.href = "http://localhost:3000/upload-link";
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;

    const tempMessageId = Date.now(); // Use timestamp as a temporary ID
    setMessages([...messages, { text: query, sender: 'user' }, { id: tempMessageId, text: 'Reading your document...', sender: 'bot', isLoading: true }]);

    setQuery('');

    try {
      const response = await axios.post('http://localhost:8001/chat', { query });
      setMessages(messages => messages.map(msg => msg.id === tempMessageId ? { ...msg, text: response.data.response, isLoading: false } : msg));
    } catch (error) {
      alert("Unable to read the documents, please try using another link");
      setMessages(messages => messages.filter(msg => msg.id !== tempMessageId)); // Remove the loading message
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.isLoading ? (
              <>
                <ClipLoader size={20} color={"#fff"} /> {msg.text}
              </>
            ) : msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <button type="button" className="link-button" onClick={handleLinkChange}>Use another link</button>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your message..."
          required
        ></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
