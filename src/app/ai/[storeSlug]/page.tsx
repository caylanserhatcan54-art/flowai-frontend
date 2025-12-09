"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { askAssistant } from "@/lib/assistant";

export default function StoreAssistantPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();

    // kullanıcı mesajı listeye ekleniyor
    setMessages(prev => [...prev, { from: "user", text: userMsg }]);
    setInput("");

    // backend’e istek
    const reply = await askAssistant(userMsg, storeSlug);

    // backend cevabı listeye ekleniyor
    setMessages(prev => [...prev, { from: "bot", text: reply }]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg bg-gray-900 rounded-xl border border-gray-700 shadow-lg p-4">
        <h1 className="text-xl mb-2 font-semibold">
          FlowAI – {storeSlug} Mağaza Asistanı
        </h1>

        {/* CHAT ALANI */}
        <div className="h-[60vh] overflow-y-auto bg-gray-800 rounded-md p-2 border border-gray-700 mb-3 text-sm">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 flex ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-[80%] ${
                  msg.from === "user"
                    ? "bg-blue-600"
                    : "bg-gray-700 border border-gray-600"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* MESAJ ALANI */}
        <div className="flex gap-2">
          <input
            className="flex-1 px-3 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none text-sm"
            placeholder="Ürün hakkında soru sor..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
          />

          <button
            className="px-4 py-2 bg-blue-600 rounded-md font-medium text-sm"
            onClick={sendMessage}
          >
            Gönder
          </button>
        </div>

      </div>
    </div>
  );
}
