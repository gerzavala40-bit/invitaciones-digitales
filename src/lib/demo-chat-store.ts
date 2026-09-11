// In-memory store para el demo del chat (sin DB)
// Se resetea cuando el server se reinicia

export interface DemoParticipant {
  id: string;
  nickname: string;
  tableNumber: string;
  avatarColor: string;
  statusText: string | null;
  accessToken: string;
  isOnline: boolean;
  lastSeen: Date;
}

export interface DemoChatMessage {
  id: string;
  message: string;
  messageType: string; // text, nudge, join, leave
  channel: string; // "general" o "mesa-X"
  fontColor: string;
  createdAt: string; // ISO string
  sender: {
    id: string;
    nickname: string;
    tableNumber: string;
    avatarColor: string;
  };
}

// Global store (persiste mientras el server corra)
const globalForDemo = globalThis as unknown as {
  demoChatParticipants: DemoParticipant[];
  demoChatMessages: DemoChatMessage[];
  demoChatCounter: number;
};

if (!globalForDemo.demoChatParticipants) {
  globalForDemo.demoChatParticipants = [];
}
if (!globalForDemo.demoChatMessages) {
  globalForDemo.demoChatMessages = [];
}
if (!globalForDemo.demoChatCounter) {
  globalForDemo.demoChatCounter = 0;
}

function generateId(): string {
  globalForDemo.demoChatCounter++;
  return `demo-${Date.now()}-${globalForDemo.demoChatCounter}`;
}

function generateToken(): string {
  return `token-${Math.random().toString(36).substring(2)}-${Date.now()}`;
}

// === PARTICIPANTS ===

export function demoJoinChat(nickname: string, tableNumber: string, avatarColor: string): {
  participant: DemoParticipant;
  isReconnect: boolean;
} {
  // Check if nickname already exists
  const existing = globalForDemo.demoChatParticipants.find(
    (p) => p.nickname.toLowerCase() === nickname.toLowerCase()
  );

  if (existing) {
    existing.isOnline = true;
    existing.lastSeen = new Date();
    return { participant: existing, isReconnect: true };
  }

  const participant: DemoParticipant = {
    id: generateId(),
    nickname,
    tableNumber,
    avatarColor,
    statusText: null,
    accessToken: generateToken(),
    isOnline: true,
    lastSeen: new Date(),
  };

  globalForDemo.demoChatParticipants.push(participant);

  // Add join message
  const joinMsg: DemoChatMessage = {
    id: generateId(),
    message: `${nickname} (Mesa ${tableNumber}) se unió al chat 🎉`,
    messageType: "join",
    channel: "general",
    fontColor: "#000000",
    createdAt: new Date().toISOString(),
    sender: {
      id: participant.id,
      nickname: participant.nickname,
      tableNumber: participant.tableNumber,
      avatarColor: participant.avatarColor,
    },
  };
  globalForDemo.demoChatMessages.push(joinMsg);

  return { participant, isReconnect: false };
}

export function demoGetParticipantByToken(token: string): DemoParticipant | null {
  return globalForDemo.demoChatParticipants.find((p) => p.accessToken === token) || null;
}

export function demoGetParticipants(): DemoParticipant[] {
  const threshold = Date.now() - 60000; // 60s
  return globalForDemo.demoChatParticipants.map((p) => ({
    ...p,
    isOnline: p.lastSeen.getTime() >= threshold,
  }));
}

export function demoUpdateStatus(token: string, statusText: string): DemoParticipant | null {
  const participant = demoGetParticipantByToken(token);
  if (!participant) return null;
  participant.statusText = statusText;
  participant.lastSeen = new Date();
  return participant;
}

// === MESSAGES ===

export function demoSendMessage(
  token: string,
  message: string,
  channel: string = "general",
  fontColor: string = "#000000",
  messageType: string = "text"
): DemoChatMessage | null {
  const participant = demoGetParticipantByToken(token);
  if (!participant) return null;

  participant.lastSeen = new Date();
  participant.isOnline = true;

  const chatMessage: DemoChatMessage = {
    id: generateId(),
    message,
    messageType,
    channel,
    fontColor,
    createdAt: new Date().toISOString(),
    sender: {
      id: participant.id,
      nickname: participant.nickname,
      tableNumber: participant.tableNumber,
      avatarColor: participant.avatarColor,
    },
  };

  globalForDemo.demoChatMessages.push(chatMessage);

  // Keep max 500 messages in memory
  if (globalForDemo.demoChatMessages.length > 500) {
    globalForDemo.demoChatMessages = globalForDemo.demoChatMessages.slice(-300);
  }

  return chatMessage;
}

export function demoGetMessages(channel: string, after?: string): DemoChatMessage[] {
  let messages = globalForDemo.demoChatMessages.filter((m) => m.channel === channel);

  if (after) {
    const afterDate = new Date(after);
    messages = messages.filter((m) => new Date(m.createdAt) > afterDate);
  }

  return messages.slice(-100); // Max 100 messages
}

export function demoSendNudge(token: string, channel: string = "general"): DemoChatMessage | null {
  const participant = demoGetParticipantByToken(token);
  if (!participant) return null;

  return demoSendMessage(
    token,
    `${participant.nickname} envió un zumbido! 📳`,
    channel,
    "#000000",
    "nudge"
  );
}

// === RESET (para testing) ===
export function demoResetChat(): void {
  globalForDemo.demoChatParticipants = [];
  globalForDemo.demoChatMessages = [];
  globalForDemo.demoChatCounter = 0;
}
