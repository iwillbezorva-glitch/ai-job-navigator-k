// Mock data store for demo mode (when Supabase is not configured)

export interface MockStore {
  users: any[];
  consulting_requests: any[];
  documents: any[];
  ai_prompts: any[];
  results: any[];
}

const initialData: MockStore = {
  users: [
    { id: "u1", email: "student@test.com", role: "student", full_name: "김지원", created_at: new Date().toISOString() },
    { id: "u2", email: "consultant@test.com", role: "consultant", full_name: "박상현 컨설턴트", created_at: new Date().toISOString() },
  ],
  consulting_requests: [
    { id: "cr1", student_id: "u1", target_company: "삼성전자", job_description_url_or_text: "삼성전자 DX부문 소프트웨어 개발 직무. React/Node.js 경력 우대. 클라우드 서비스 개발 경험 필수.", status: "completed", created_at: "2025-02-15T09:00:00Z" },
    { id: "cr2", student_id: "u1", target_company: "네이버", job_description_url_or_text: "네이버 검색 서비스 프론트엔드 개발. TypeScript, React, Next.js 필수. 대규모 트래픽 처리 경험 우대.", status: "in_progress", created_at: "2025-02-20T10:00:00Z" },
    { id: "cr3", student_id: "u1", target_company: "카카오", job_description_url_or_text: "카카오 플랫폼 백엔드 개발. Java/Spring Boot, MSA 아키텍처 경험. Kubernetes 운영 경험 우대.", status: "pending", created_at: "2025-02-25T11:00:00Z" },
    { id: "cr4", student_id: "u1", target_company: "LG CNS", job_description_url_or_text: "LG CNS 클라우드 엔지니어. AWS/Azure 자격증 보유자 우대. DevOps 파이프라인 구축 경험.", status: "pending", created_at: "2025-02-26T08:00:00Z" },
    { id: "cr5", student_id: "u1", target_company: "SK하이닉스", job_description_url_or_text: "SK하이닉스 AI 반도체 설계. 머신러닝 모델 최적화 경험. Python, TensorFlow 필수.", status: "completed", created_at: "2025-01-10T09:00:00Z" },
  ],
  documents: [
    { id: "d1", request_id: "cr1", file_url: "/resume.pdf", parsed_text: "김지원 이력서\n\n학력: 서울대학교 컴퓨터공학과 졸업 (2024)\nGPA: 3.8/4.5\n\n경력:\n- ABC 스타트업 프론트엔드 인턴 (6개월)\n  React, TypeScript 기반 대시보드 개발\n  성능 최적화로 LCP 40% 개선\n\n- DEF 연구소 연구보조 (1년)\n  NLP 기반 텍스트 분석 프로젝트\n\n기술스택: React, Next.js, TypeScript, Node.js, Python, AWS\n자격증: 정보처리기사, AWS Solutions Architect", document_type: "resume" },
    { id: "d2", request_id: "cr2", file_url: "/portfolio.pdf", parsed_text: "김지원 포트폴리오\n\n프로젝트 1: AI 기반 뉴스 요약 서비스\n- Next.js + OpenAI API 활용\n- 월 5,000 MAU 달성\n\n프로젝트 2: 실시간 협업 도구\n- WebSocket 기반 실시간 동기화\n- React + Firebase 활용", document_type: "portfolio" },
  ],
  ai_prompts: [
    { id: "ap1", category: "자기소개서", title: "IT 개발자 자소서 피드백", system_prompt: "당신은 10년 경력의 IT 기업 인사담당자입니다. 지원자의 자기소개서를 분석하고 다음 관점에서 피드백을 제공하세요:\n1. 직무 적합성 분석\n2. STAR 기법 활용도\n3. 구체적 성과/수치 포함 여부\n4. 개선 제안 (before/after 예시 포함)\n5. 전체 완성도 점수 (10점 만점)", created_by: "u2" },
    { id: "ap2", category: "모의면접", title: "IT 개발직 기술면접 질문 생성", system_prompt: "당신은 대기업 IT 개발팀의 기술면접관입니다. 지원자의 이력서와 채용공고를 분석하여 다음을 생성하세요:\n1. 기술 질문 5개 (난이도별)\n2. 인성/상황 질문 3개\n3. 각 질문의 의도 설명\n4. 모범 답변 가이드\n5. 압박질문 2개와 대처 전략", created_by: "u2" },
    { id: "ap3", category: "포트폴리오", title: "포트폴리오 분석 및 개선점", system_prompt: "당신은 시니어 개발자이자 채용 심사위원입니다. 지원자의 포트폴리오를 분석하고:\n1. 프로젝트 완성도 평가\n2. 기술 스택 적절성\n3. 문제 해결 능력 평가\n4. 부족한 부분 및 보완 제안\n5. 면접에서 강조할 포인트", created_by: "u2" },
    { id: "ap4", category: "직무기술서", title: "채용공고 기반 직무분석", system_prompt: "당신은 커리어 컨설턴트입니다. 채용공고를 분석하여:\n1. 핵심 요구 역량 추출\n2. 우대사항 중요도 순위\n3. 지원자 스펙과의 매칭률\n4. 준비해야 할 기술/경험\n5. 경쟁력 강화 전략", created_by: "u2" },
  ],
  results: [
    { id: "r1", request_id: "cr1", ai_draft: "", final_content: "# 삼성전자 DX부문 맞춤 컨설팅 보고서\n\n## 1. 직무 적합성 분석\n김지원 님은 React/Node.js 기반의 프론트엔드 개발 경험과 AWS 클라우드 경험을 갖추고 있어 삼성전자 DX부문 소프트웨어 개발 직무에 높은 적합성을 보입니다.\n\n## 2. 강점\n- LCP 40% 개선 등 구체적 성과 수치 보유\n- 정보처리기사, AWS SA 자격증\n- NLP 연구 경험으로 AI 트렌드 이해\n\n## 3. 면접 예상 질문\nQ1. React에서 성능 최적화를 위해 어떤 기법을 사용하셨나요?\nQ2. 대규모 트래픽 처리 경험에 대해 설명해주세요.\n\n## 4. 개선 제안\n- 클라우드 네이티브 프로젝트 경험 추가 권장\n- 삼성 SSAFY 또는 관련 프로그램 이수 이력 강조", updated_at: "2025-02-18T15:00:00Z" },
    { id: "r2", request_id: "cr5", ai_draft: "", final_content: "# SK하이닉스 AI 반도체 설계 맞춤 컨설팅\n\n## 분석 결과\n현재 프로필은 소프트웨어 중심이므로 직접적 매칭률은 60%입니다.\n\n## 전략\n1. ML 모델 최적화 경험을 하드웨어 관점에서 재해석\n2. TensorFlow Lite, ONNX 등 엣지 AI 경험 강조", updated_at: "2025-01-15T12:00:00Z" },
  ],
};

let store: MockStore = JSON.parse(JSON.stringify(initialData));

export const mockDB = {
  get: (table: keyof MockStore) => store[table] || [],
  insert: (table: keyof MockStore, data: any) => {
    const id = "id_" + Date.now() + Math.random().toString(36).substr(2, 5);
    const record = { id, ...data, created_at: new Date().toISOString() };
    store[table] = [...(store[table] || []), record];
    return record;
  },
  update: (table: keyof MockStore, id: string, data: any) => {
    store[table] = (store[table] || []).map((r: any) => (r.id === id ? { ...r, ...data } : r));
    return store[table].find((r: any) => r.id === id);
  },
  delete: (table: keyof MockStore, id: string) => {
    store[table] = (store[table] || []).filter((r: any) => r.id !== id);
  },
  query: (table: keyof MockStore, filter: (r: any) => boolean) => (store[table] || []).filter(filter),
  reset: () => { store = JSON.parse(JSON.stringify(initialData)); },
};
