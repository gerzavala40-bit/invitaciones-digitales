"use client";

interface Participant {
  id: string;
  nickname: string;
  tableNumber: string;
  avatarColor: string;
  statusText: string | null;
  isOnline: boolean;
}

interface MSNContactListProps {
  participants: Participant[];
  currentParticipantId: string;
  onClose: () => void;
}

export default function MSNContactList({ participants, currentParticipantId, onClose }: MSNContactListProps) {
  const online = participants.filter((p) => p.isOnline);
  const offline = participants.filter((p) => !p.isOnline);

  return (
    <div className="absolute inset-0 z-20 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Contact panel */}
      <div className="relative ml-auto w-64 bg-[#eef3f7] border-l-2 border-[#7fbfff] h-full overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0058a8] to-[#3b8dd4] px-3 py-2 flex items-center justify-between sticky top-0">
          <span className="text-white text-sm font-bold">👥 Invitados</span>
          <button onClick={onClose} className="text-white/80 hover:text-white text-lg">✕</button>
        </div>

        {/* Online section */}
        <div className="p-2">
          <p className="text-[10px] font-bold text-[#0058a8] uppercase px-2 mb-1">
            En línea ({online.length})
          </p>
          {online.map((p) => (
            <div
              key={p.id}
              className={`flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/50 transition ${
                p.id === currentParticipantId ? "bg-[#d6e5f3]" : ""
              }`}
            >
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: p.avatarColor }}
                >
                  {p.nickname.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#eef3f7]"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-bold truncate"
                  style={{ color: p.avatarColor }}
                >
                  {p.nickname}
                  {p.id === currentParticipantId && " (vos)"}
                </p>
                <p className="text-[10px] text-gray-500 truncate">
                  {p.statusText || `Mesa ${p.tableNumber}`}
                </p>
              </div>
            </div>
          ))}

          {/* Offline section */}
          {offline.length > 0 && (
            <>
              <p className="text-[10px] font-bold text-gray-400 uppercase px-2 mb-1 mt-3">
                Desconectados ({offline.length})
              </p>
              {offline.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2 px-2 py-1.5 rounded opacity-50"
                >
                  <div className="relative">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: p.avatarColor }}
                    >
                      {p.nickname.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gray-400 rounded-full border-2 border-[#eef3f7]"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 truncate">
                      {p.nickname}
                    </p>
                    <p className="text-[10px] text-gray-400 truncate">
                      Mesa {p.tableNumber}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
