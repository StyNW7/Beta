import React, { useState } from "react";
import { useGameStore } from "../../store/gameStore";

export default function ChatDialogue() {
  const { isChatModalOpen, closeChatModal } = useGameStore();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: messages.length + 1, text: input }]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (!isChatModalOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full h-[30vh] bg-gray-100 border-t border-gray-300 flex flex-col">
      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="mb-2 px-3 py-2 bg-white rounded shadow-sm max-w-xs"
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="p-2 border-t border-gray-300 flex items-center gap-2">
        <input
          type="text"
          className="flex-grow px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
