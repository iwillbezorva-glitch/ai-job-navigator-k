# AI Job Navigator K

AI 기반 맞춤형 취업 컨설팅 플랫폼

## 🚀 Vercel 배포 방법 (3단계)

### 1단계: GitHub에 코드 올리기

```bash
# 1. GitHub에서 새 저장소(Repository) 생성
# https://github.com/new 에서 "ai-job-navigator-k" 이름으로 생성

# 2. 이 폴더에서 실행
cd job-navigator
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-job-navigator-k.git
git push -u origin main
```

### 2단계: Vercel에 배포

1. [vercel.com](https://vercel.com) 접속 → GitHub 계정으로 로그인
2. **"Add New Project"** 클릭
3. GitHub에서 방금 올린 `ai-job-navigator-k` 저장소 선택
4. **"Deploy"** 클릭 → 자동으로 빌드 & 배포됨
5. 배포 완료 후 `https://ai-job-navigator-k.vercel.app` 같은 URL 생성

### 3단계: 환경변수 설정 (선택사항)

Vercel 대시보드 → Settings → Environment Variables에서:

| 변수명 | 설명 |
|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key |
| `GEMINI_API_KEY` | Google Gemini API Key |
| `GOOGLE_CLIENT_EMAIL` | GCP Service Account Email |
| `GOOGLE_PRIVATE_KEY` | GCP Service Account Private Key |
| `GOOGLE_SHEET_ID` | 내보낼 Google Sheet ID |

> ⚠️ 환경변수 없이도 데모 모드로 동작합니다!

---

## 📁 프로젝트 구조

```
job-navigator/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 페이지 (전체 앱)
│   ├── globals.css         # 글로벌 스타일
│   └── api/
│       ├── generate/route.ts        # Gemini API 스트리밍
│       ├── upload-document/route.ts # PDF 업로드 & 텍스트 추출
│       └── export/
│           ├── sheets/route.ts      # Google Sheets 내보내기
│           └── docs/route.ts        # Google Docs 내보내기
├── lib/
│   ├── supabase.ts         # Supabase 클라이언트 & 타입
│   └── mock-data.ts        # 데모용 목업 데이터
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── supabase-schema.sql     # DB 스키마 (Supabase SQL Editor에서 실행)
```

## 🔑 API 키 발급 방법

### Gemini API
1. [Google AI Studio](https://aistudio.google.com/) 접속
2. "Get API Key" → API 키 생성

### Supabase
1. [supabase.com](https://supabase.com) → 새 프로젝트 생성
2. Settings → API에서 URL과 Anon Key 복사
3. SQL Editor에서 `supabase-schema.sql` 실행

### Google Workspace (Sheets/Docs)
1. [Google Cloud Console](https://console.cloud.google.com) → 새 프로젝트
2. "Google Sheets API", "Google Docs API" 활성화
3. 서비스 계정 생성 → JSON 키 다운로드
4. JSON에서 `client_email`, `private_key` 추출
