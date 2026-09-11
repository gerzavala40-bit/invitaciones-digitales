"use client";

interface ChatMessage {
  id: string;
  message: string;
  messageType: string;
  channel: string;
  fontColor: string;
  createdAt: string;
  sender: {
    id: string;
    nickname: string;
    tableNumber: string;
    avatarColor: string;
  };
}

interface MSNMessageBubbleProps {
  message: ChatMessage;
  isOwn: boolean;
}

export default function MSNMessageBubble({ message, isOwn }: MSNMessageBubbleProps) {
  const time = new Date(message.createdAt).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // System messages (join, leave)
  if (message.messageType === "join" || message.messageType === "leave") {
    return (
      <div className="text-center py-1">
        <span className="text-xs text-gray-400 italic bg-gray-50 px-3 py-1 rounded-full">
          {message.message}
        </span>
      </div>
    );
  }

  // Nudge messages
  if (message.messageType === "nudge") {
    return (
      <div className="text-center py-1">
        <span className="text-xs text-[#FF8C00] font-bold bg-[#FFD700]/10 px-3 py-1 rounded-full animate-pulse">
          📳 {message.message}
        </span>
      </div>
    );
  }

  // Regular text messages - MSN style
  return (
    <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"} mb-1`}>
      {/* Sender name (MSN style: "Nickname dice:") */}
      <div className="flex items-baseline gap-1 px-1">
        <span
          className="text-xs font-bold"
          style={{ color: message.sender.avatarColor }}
        >
          {message.sender.nickname}
        </span>
        <span className="text-[10px] text-gray-400">
          (Mesa {message.sender.tableNumber})
        </span>
        <span className="text-[10px] text-gray-400">dice:</span>
        <span className="text-[10px] text-gray-300">{time}</span>
      </div>

      {/* Message content */}
      <div
        className={`px-3 py-1 rounded-lg max-w-[85%] ${
          isOwn ? "bg-[#d6e5f3]" : "bg-white"
        }`}
      >
        <p
          className="text-sm break-words"
          style={{ color: message.fontColor || "#000000" }}
        >
          {message.message}
        </p>
      </div>
    </div>
  );
}
