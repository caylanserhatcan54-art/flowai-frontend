"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  const sendMessage = async () => {
    setMessages([...messages, { role: "user", text }]);

    const res = await apiFetch("/ai/chat", {
      method: "POST",
      body: JSON.stringify({ message: text }),
    });

    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: res.reply },
    ]);

    setText("");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>FlowAI Chat</h1>

      {messages.map((m, i) => (
        <p key={i}><b>{m.role}:</b> {m.text}</p>
      ))}

      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={sendMessage}>Gönder</button>
    </div>
  );
}
