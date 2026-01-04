// Firebase 메시지 데이터 타입
export interface MessageData {
  id: string; 
  firebaseId?: string;
  receiver: string; 
  password: string; 
  content: string; 
  from: string;
  to?: string; // 받는 사람 이름
  doorId: number; 
  themeColor?: string;
  reply?: string;
  repliedAt?: number;
  isRead?: boolean;
  readAt?: number;
  hasReplied?: boolean; // DB의 has_replied 필드 (내가 답장을 보냈는지)
  createdAt?: number;
}

// 사운드 타입
export type SoundType = 'hover' | 'click' | 'success' | 'error' | 'open' | 'playDisc' | 'turnPage' | 'receipt' | 'cdCase';

// 커서 종류
export type CursorVariant = 'default' | 'pointer' | 'key' | 'snowflake' | 'quill' | 'stamp';