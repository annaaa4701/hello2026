// 타입 정의
export interface Stage {
  id: number;
  keyword: string;
  color: string;
  message: string;
}

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

export type CursorVariant = 'default' | 'pointer' | 'coin';
export type SoundType = 'hover' | 'click' | 'success' | 'error';

// JSX 타입 정의
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
