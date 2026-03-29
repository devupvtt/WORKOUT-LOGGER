import React, { useState } from "react";
import axios from "axios";

function Chat() {
  const API = "http://127.0.0.1:5000";

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message) return;

    const newChat = [...chat, { role: "user", text: message }];
    setChat(newChat);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${API}/ai/chat`, {
        message: message,
      });

      setChat([
        ...newChat,
        { role: "ai", text: res.data.reply }
      ]);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>💬 AI Chat</h2>

      <div className="chat-box">
        {chat.map((c, i) => (
          <div key={i} className={c.role === "user" ? "user" : "ai"}>
            {c.text}
          </div>
        ))}
        {loading && <p>🤖 typing...</p>}
      </div>

      <input
        placeholder="Ask AI..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;