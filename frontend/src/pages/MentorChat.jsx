import { useState } from "react";
import "../styles/MentorChat.css";

export default function MentorChat() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi 👋 I'm your AI Career Mentor. Ask me anything about your future!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text })
      });

      const data = await res.json();
      const aiMsg = { sender: "ai", text: data.reply };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [...prev, {
        sender: "ai",
        text: "⚠️ AI server is not responding. Please try again."
      }]);
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <h1>🤖 AI Career Mentor</h1>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}

          {loading && <div className="message ai">Thinking...</div>}
        </div>

        <div className="chat-input">
          <input
            placeholder="Ask your career question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
