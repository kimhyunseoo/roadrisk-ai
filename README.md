# roadrisk-ai

AI-powered road damage detection and maintenance prioritization using computer vision and multimodal data.

시민이 도로 사진을 업로드하면 AI가 균열·포트홀을 탐지하고, 강수량·교통량·도로유형 데이터와 결합해 포트홀 발전 위험도(Low/Medium/High)를 진단하는 서비스입니다.

## 현재 상태: 프론트엔드 데모

실제 AI 모델과 연동되지 않은 UI 흐름 데모입니다. 세그멘테이션 결과와 위험도는 `src/data/mockData.js`에서 더미로 시뮬레이션됩니다.

### 화면 구성

- **메인 화면** (`/`) — 서비스 소개, 도로 사진 업로드
- **결과 화면** (`/result`) — 균열 오버레이, 균열 면적/길이, 위험도 뱃지, GPS 위치
- **지자체 대시보드** (`/dashboard`) — 신고 위치 지도(위험도별 색상 마커) + 리스트 뷰, 위험도 필터

### 기술 스택

React + Vite, Tailwind CSS v4, React Router, Leaflet (OpenStreetMap)

## 개발

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```
