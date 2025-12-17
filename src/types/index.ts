// 타입 정의 업데이트
export interface MessageData {
  id: string; 
  receiver: string; 
  password: string; 
  content: string; 
  from: string; 
  doorId: number; 
  themeColor?: string; 
}

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