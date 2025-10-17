// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Amplify 배포를 위한 기본 경로 설정
  base: '/',
  // 빌드 출력(결과물이 저장될) 디렉토리 (기본값: dist)
  build: {
    outDir: 'dist',
  }
})