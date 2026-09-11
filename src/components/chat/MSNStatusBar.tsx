"use client";

interface MSNStatusBarProps {
  nickname: string;
  avatarColor: string;
  tableNumber: string;
  statusText: string;
  showStatusInput: boolean;
  onStatusClick: () => void;
  onStatusChange: (text: string) => void;
  onStatusSave: () => void;
}

export default function MSNStatusBar({
  nickname,
  avatarColor,
  tableNumber,
  statusText,
  showStatusInput,
  onStatusClick,
  onStatusChange,
  onStatusSave,
}: MSNStatusBarProps) {
  return (
    <div className="bg-[#d6e5f3] border-x-2 border-[#7fbfff] px-3 py-2">
      <div className="flex items-center gap-2">
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md"
          style={{ backgroundColor: avatarColor }}
        >
          {nickname.charAt(0).toUpperCase()}
        </div>

        {/* Nick & status */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold truncate" style={{ color: avatarColor }}>
            {nickname}
            <span className="text-[10px] text-gray-500 font-normal ml-1">
              Mesa {tableNumber}
            </span>
          </p>

          {showStatusInput ? (
            <form
              onSubmit={(e) => { e.preventDefault(); onStatusSave(); }}
              className="flex gap-1 mt-0.5"
            >
              <input
                type="text"
                value={statusText}
                onChange={(e) => onStatusChange(e.target.value)}
                placeholder="Tu estado..."
                maxLength={100}
                className="flex-1 text-[10px] px-2 py-0.5 border border-[#7fbfff] rounded bg-white focus:outline-none focus:border-[#0058a8]"
                autoFocus
              />
              <button
                type="submit"
                className="text-[10px] px-2 py-0.5 bg-[#0058a8] text-white rounded hover:bg-[#004080]"
              >
                ✓
              </button>
            </form>
          ) : (
            <button
              onClick={onStatusClick}
              className="text-[10px] text-gray-500 italic hover:text-[#0058a8] transition truncate block text-left w-full"
            >
              {statusText || "♫ Hacé click para poner tu estado..."}
            </button>
          )}
        </div>

        {/* Online indicator */}
        <div className="flex items-center gap-1 shrink-0">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] text-green-700 font-medium">En línea</span>
        </div>
      </div>
    </div>
  );
}
