// import { useState } from "react";
// import "../styles/VoiceAssistant.css";

// export default function VoiceAssistant() {
//   const [listening, setListening] = useState(false);
//   const [spokenText, setSpokenText] = useState("");
//   const [aiReply, setAiReply] = useState("");

//   const speak = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = "en-IN";
//     window.speechSynthesis.speak(utterance);
//   };

//   const generateAIReply = async (text) => {
//     try {
//       const res = await fetch("http://localhost:8000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: text })
//       });

//       const data = await res.json();
//       setAiReply(data.reply);
//       speak(data.reply);

//     } catch (err) {
//       setAiReply("AI server is not responding. Please try again.");
//     }
//   };

//   const startListening = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Speech Recognition not supported in this browser");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.start();
//     setListening(true);

//     recognition.onresult = (event) => {
//       const text = event.results[0][0].transcript;
//       setSpokenText(text);
//       setListening(false);
//       generateAIReply(text);
//     };

//     recognition.onerror = () => {
//       setListening(false);
//       alert("Voice recognition failed");
//     };
//   };

//   return (
//     <div className="voice-container">
//       <div className="voice-card">
//         <h1>🎤 AI Voice Career Assistant</h1>
//         <p>Ask your career questions by speaking</p>

//         <div className="mic-wrapper">
//           <button
//             className={listening ? "mic-btn active" : "mic-btn"}
//             onClick={startListening}
//           >
//             🎙
//           </button>
//           <p className="mic-text">
//             {listening ? "Listening..." : "Tap to Speak"}
//           </p>
//         </div>

//         {spokenText && (
//           <div className="result-box">
//             <h3>You said:</h3>
//             <p>{spokenText}</p>
//           </div>
//         )}

//         {aiReply && (
//           <div className="ai-box">
//             <h3>AI Mentor:</h3>
//             <p>{aiReply}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import "../styles/VoiceAssistant.css";

export default function VoiceAssistant() {

  const [listening, setListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [loading, setLoading] = useState(false);

  const speak = (text) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";

    window.speechSynthesis.speak(utterance);
  };

  const generateAIReply = async (text) => {

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();

      setAiReply(data.reply);
      speak(data.reply);

    } catch (err) {

      const errorMsg = "AI server is not responding. Please try again.";

      setAiReply(errorMsg);
      speak(errorMsg);
    }

    setLoading(false);
  };

  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {

      const text = event.results[0][0].transcript;

      setSpokenText(text);
      setListening(false);

      generateAIReply(text);
    };

    recognition.onerror = () => {
      setListening(false);
      alert("Voice recognition failed");
    };
  };

  return (
    <div className="voice-container">

      <div className="voice-card">

        <h1>🎤 AI Voice Career Assistant</h1>
        <p>Ask your career questions by speaking</p>

        <div className="mic-wrapper">

          <button
            className={listening ? "mic-btn active" : "mic-btn"}
            onClick={startListening}
          >
            🎙
          </button>

          <p className="mic-text">
            {listening ? "Listening..." : "Tap to Speak"}
          </p>

        </div>

        {loading && <p>AI is thinking...</p>}

        {spokenText && (
          <div className="result-box">
            <h3>You said:</h3>
            <p>{spokenText}</p>
          </div>
        )}

        {aiReply && (
          <div className="ai-box">
            <h3>AI Mentor:</h3>
            <p>{aiReply}</p>
          </div>
        )}

      </div>

    </div>
  );
}

