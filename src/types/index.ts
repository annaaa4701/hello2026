// 타입 정의 업데이트 (Firebase 연동)
export interface MessageData {
  id: string; 
  firebaseId?: string; // Firebase Realtime Database 고유 ID
  receiver: string; 
  password: string; 
  content: string; 
  from: string; 
  doorId: number; 
  themeColor?: string;
  reply?: string; // 답장 내용
  repliedAt?: number; // 답장 시간
  isRead?: boolean; // 읽음 상태
  readAt?: number; // 읽은 시간
  hasReply?: boolean; // 답장 여부
  createdAt?: number; // 생성 시간
}

// Stage 타입 정의
export interface Stage {
  id: number;
  keyword: string;
  color: string;
  message: string;
}

// 사운드 타입 정의
export type SoundType = 'hover' | 'click' | 'success' | 'error' | 'door' | 'snow' | 'bell' | 'open';

// 커서 종류 업데이트 (snowflake 추가)
export type CursorVariant = 'default' | 'pointer' | 'key' | 'quill' | 'stamp' | 'snowflake';

// ... (기존 타입 유지)
export interface House {
  x: number;
  y: number;
  type: number;
  color: string;
}

export interface Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
}