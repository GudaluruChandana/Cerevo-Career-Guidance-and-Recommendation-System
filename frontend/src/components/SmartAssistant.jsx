import { useState } from "react";
import "../styles/SmartAssistant.css";

export default function SmartAssistant() {

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi 👋 I’m your Smart Career Assistant. You can type or speak."
    }
  ]);

  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);


  // 🔊 Speak
  const speak = (text) => {

    window.speechSynthesis.cancel();

    let clean = text
      .replace(/\*/g, "")
      .replace(/\n+/g, ". ")
      .replace(/\s+/g, " ");

    const utter = new SpeechSynthesisUtterance(clean);

    utter.lang = "en-IN";
    utter.rate = 1;

    window.speechSynthesis.speak(utter);
  };


  // ⏹ Stop voice
  const stopVoice = () => {
    window.speechSynthesis.cancel();
  };


  // 📤 Send message
  const sendMessage = async (text) => {

    if (!text.trim()) return;

    const userMsg = { sender: "user", text };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {

      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();

      const aiMsg = {
        sender: "ai",
        text: data.reply
      };

      setMessages(prev => [...prev, aiMsg]);

      // speak(data.reply);

    } catch {

      setMessages(prev => [...prev, {
        sender: "ai",
        text: "⚠️ Server not responding"
      }]);
    }

    setLoading(false);
  };


  // 🎤 Start listening
  const startListening = () => {

    const SR =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SR) {
      alert("Speech recognition not supported");
      return;
    }

    const recog = new SR();

    recog.lang = "en-IN";
    recog.start();

    setListening(true);

    recog.onresult = (e) => {

      const text =
        e.results[0][0].transcript;

      setListening(false);

      sendMessage(text);
    };

    recog.onerror = () => {
      setListening(false);
    };
  };


  return (

    <div className="smart-container">

      <div className="smart-box">

        <h1>🤖 Smart Career Assistant</h1>


        {/* Chat Area */}
        <div className="chat-area">

          {/* {messages.map((m, i) => (

            <div
              key={i}
              className={`msg ${m.sender}`} */}
            {/* > */}
            {messages.map((m, i) => (

              <div
                key={i}
                className={`msg ${m.sender}`}
              >

                {m.text.split("\n").map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}

                {/* Speak button for AI */}
                {m.sender === "ai" && (
                  <button
                    className="speak-btn"
                    onClick={() => speak(m.text)}
                  >
                    🔊 Listen
                  </button>
                )}

              </div>
            ))}


              {/* {m.text.split("\n").map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}

            </div>

          ))} */}

          {loading &&
            <div className="msg ai">
              Thinking...
            </div>
          }

        </div>


        {/* Input Area */}
        {/* <div className="input-area">

          <input
            placeholder="Type or speak..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e =>
              e.key === "Enter" &&
              sendMessage(input)
            }
          /> */}
          <div className="input-area">

            <div className="input-wrapper">
              <input
                placeholder="Type or speak..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e =>
                  e.key === "Enter" &&
                  sendMessage(input)
                }
              />
            </div>


          <button
            className="send-btn"
            onClick={() => sendMessage(input)}
          >
            Send
          </button>


          <button
            className={
              listening ? "mic-btn active" : "mic-btn"
            }
            onClick={startListening}
          >
            🎤
          </button>


          <button
            className="stop-btn"
            onClick={stopVoice}
          >
            ⏹
          </button>

        </div>

      </div>

    </div>
  );
}
