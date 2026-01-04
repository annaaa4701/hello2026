/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bebas': ['"Bebas Neue"', 'sans-serif'], // 이건 구글 폰트에서 link로 index.html에 추가 필요할 수도 있음 (또는 global.css import)
        'barcode': ['"Libre Barcode 39 Text"', 'cursive'],
        'mono': ['"Share Tech Mono"', 'monospace'],
        'hand': ['"Gowun Batang"', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'stamp': 'stamp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        stamp: {
          '0%': { transform: 'scale(3)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}