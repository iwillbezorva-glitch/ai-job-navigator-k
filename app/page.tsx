"use client";

import { useState, useRef } from "react";
import { mockDB } from "@/lib/mock-data";

// ============================================================
// ICONS
// ============================================================
const Icons = {
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>,
  Upload: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Folder: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  Workspace: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  Prompt: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Chart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Settings: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  Sparkle: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/></svg>,
  Download: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Trash: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Edit: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Send: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  File: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  Google: () => <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>,
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  X: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

// Status Badge
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    in_progress: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  };
  const labels: Record<string, string> = { pending: "대기중", in_progress: "진행중", completed: "완료" };
  const dots: Record<string, string> = { pending: "bg-amber-400", in_progress: "bg-blue-400 animate-pulse", completed: "bg-emerald-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`}/> {labels[status]}
    </span>
  );
};

// Gemini API call
const callGeminiAPI = async (apiKey: string | undefined, systemPrompt: string, userContent: string) => {
  if (!apiKey) {
    return { async *[Symbol.asyncIterator]() {
      const fake = `## AI 분석 결과 (데모 모드)\n\n> Gemini API 키가 설정되지 않아 시뮬레이션된 결과입니다.\n\n### 1. 종합 분석\n적합도 **85%**로 평가됩니다.\n\n### 2. 강점\n- 관련 기술 스택 실무 경험 보유\n- 구체적인 성과 수치 입증\n- 관련 자격증 보유\n\n### 3. 개선 필요 사항\n- 대규모 프로젝트 리딩 경험 보충\n- 도메인 지식 강화\n\n### 4. 면접 준비\n**Q1.** 가장 도전적이었던 프로젝트는?\n**Q2.** 기술적 의견 충돌 해결 방법은?\n\n### 5. 최종 제안\n자기소개서에서 **문제 해결 과정**을 STAR 기법으로 재구성하세요.`;
      for (const word of fake.split(" ")) { yield word + " "; await new Promise(r => setTimeout(r, 30)); }
    }};
  }
  const res = await fetch(`/api/generate`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ systemPrompt, userContent }) });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  return { async *[Symbol.asyncIterator]() {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield decoder.decode(value, { stream: true });
    }
  }};
};

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================
export default function Home() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ---- AUTH SCREEN ----
  if (!currentUser) {
    const quickLogin = (email: string) => {
      const user = mockDB.query("users", (u: any) => u.email === email)[0];
      if (user) setCurrentUser(user);
    };
    return (
      <div className="min-h-screen bg-[#0a0a1a] overflow-y-auto p-4">
        <div className="absolute inset-0 pointer-events-none"><div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6c5ce7]/10 rounded-full blur-3xl"/><div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-3xl"/></div>
        <div className="relative z-10 w-full max-w-sm mx-auto pt-12 pb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#6c5ce7] to-[#a855f7] rounded-xl mb-3 shadow-lg shadow-[#6c5ce7]/25"><span className="text-xl font-black text-white">N</span></div>
            <h1 className="text-2xl font-black text-white tracking-tight">AI Job Navigator <span className="text-[#a855f7]">K</span></h1>
            <p className="text-gray-400 mt-1 text-xs">AI 기반 맞춤형 취업 컨설팅 플랫폼</p>
          </div>
          <div className="bg-[#12122a]/80 backdrop-blur-xl border border-[#2a2a4a] rounded-2xl p-6 shadow-2xl">
            <p className="text-sm text-gray-300 mb-4 text-center">역할을 선택하여 로그인하세요</p>
            <div className="space-y-3">
              <button onClick={() => quickLogin("student@test.com")} className="w-full flex items-center gap-4 bg-gradient-to-r from-[#6c5ce7] to-[#7c6cf7] text-white p-4 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[#6c5ce7]/20">
                <span className="text-2xl">🎓</span><div className="text-left"><div className="font-bold">학생으로 로그인</div><div className="text-xs text-white/60">김지원 (student@test.com)</div></div>
              </button>
              <button onClick={() => quickLogin("consultant@test.com")} className="w-full flex items-center gap-4 bg-gradient-to-r from-[#a855f7] to-[#c084fc] text-white p-4 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[#a855f7]/20">
                <span className="text-2xl">💼</span><div className="text-left"><div className="font-bold">컨설턴트로 로그인</div><div className="text-xs text-white/60">박상현 (consultant@test.com)</div></div>
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-4 pt-4 border-t border-[#2a2a4a]">데모 모드 · 클릭만으로 즉시 로그인</p>
          </div>
        </div>
      </div>
    );
  }

  // ---- STUDENT DASHBOARD ----
  const StudentDashboard = () => {
    const requests = mockDB.query("consulting_requests", (r: any) => r.student_id === currentUser.id);
    const stats = { total: requests.length, pending: requests.filter((r: any) => r.status === "pending").length, in_progress: requests.filter((r: any) => r.status === "in_progress").length, completed: requests.filter((r: any) => r.status === "completed").length };
    return (
      <div className="space-y-6 animate-fade-in">
        <div><h1 className="text-2xl font-black text-white">안녕하세요, {currentUser.full_name}님 👋</h1><p className="text-gray-400 mt-1">컨설팅 진행 현황을 확인하세요.</p></div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[{ l: "전체", v: stats.total, c: "text-[#a78bfa]", bg: "from-[#6c5ce7]/20 to-[#6c5ce7]/5", bd: "border-[#6c5ce7]/20" }, { l: "대기중", v: stats.pending, c: "text-amber-400", bg: "from-amber-500/20 to-amber-500/5", bd: "border-amber-500/20" }, { l: "진행중", v: stats.in_progress, c: "text-blue-400", bg: "from-blue-500/20 to-blue-500/5", bd: "border-blue-500/20" }, { l: "완료", v: stats.completed, c: "text-emerald-400", bg: "from-emerald-500/20 to-emerald-500/5", bd: "border-emerald-500/20" }].map(x => (
            <div key={x.l} className={`bg-gradient-to-br ${x.bg} border ${x.bd} rounded-2xl p-4 md:p-5`}><p className="text-gray-400 text-xs md:text-sm">{x.l}</p><p className={`text-2xl md:text-3xl font-black mt-1 ${x.c}`}>{x.v}</p></div>
          ))}
        </div>
        <div className="bg-[#12122a] border border-[#2a2a4a] rounded-2xl overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-[#2a2a4a] flex items-center justify-between">
            <h2 className="font-bold text-white text-sm md:text-base">컨설팅 요청 목록</h2>
            <button onClick={() => setCurrentPage("upload")} className="flex items-center gap-2 bg-[#6c5ce7] text-white px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-semibold hover:bg-[#5b4bd6] transition-colors"><Icons.Plus /> 새 요청</button>
          </div>
          <div className="divide-y divide-[#2a2a4a]">
            {requests.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((req: any) => (
              <div key={req.id} className="px-4 md:px-6 py-4 hover:bg-[#1a1a3a]/50 transition-colors">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-white font-semibold text-sm">{req.target_company}</span>
                  <StatusBadge status={req.status} />
                </div>
                <p className="text-gray-500 text-xs mt-1 truncate">{req.job_description_url_or_text}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-gray-600 text-xs">{new Date(req.created_at).toLocaleDateString("ko-KR")}</p>
                  {req.status === "completed" && <button onClick={() => { setSelectedRequestId(req.id); setCurrentPage("result"); }} className="flex items-center gap-1 text-emerald-400 text-xs font-medium hover:underline"><Icons.Download /> 결과 보기</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ---- STUDENT UPLOAD ----
  const StudentUpload = () => {
    const [form, setForm] = useState({ target_company: "", job_description: "" });
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault(); setUploading(true);
      await new Promise(r => setTimeout(r, 1200));
      mockDB.insert("consulting_requests", { student_id: currentUser.id, target_company: form.target_company, job_description_url_or_text: form.job_description, status: "pending" });
      setUploading(false); setSuccess(true);
      setTimeout(() => { setCurrentPage("dashboard"); setSuccess(false); }, 1500);
    };
    if (success) return <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-12 text-center animate-fade-in"><div className="text-4xl mb-3">✅</div><h2 className="text-xl font-bold text-emerald-400">요청이 접수되었습니다!</h2></div>;
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <h1 className="text-2xl font-black text-white mb-2">새 컨설팅 요청</h1>
        <p className="text-gray-400 mb-6 text-sm">타겟 기업과 채용 정보를 입력하세요.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-[#12122a] border border-[#2a2a4a] rounded-2xl p-5 space-y-4">
            <div><label className="text-sm font-medium text-gray-300 mb-2 block">타겟 기업명 *</label><input type="text" value={form.target_company} onChange={e => setForm({...form, target_company: e.target.value})} className="w-full bg-[#0a0a1a] border border-[#2a2a4a] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-[#6c5ce7] focus:outline-none" placeholder="예: 삼성전자" required/></div>
            <div><label className="text-sm font-medium text-gray-300 mb-2 block">채용공고 / 직무기술 *</label><textarea value={form.job_description} onChange={e => setForm({...form, job_description: e.target.value})} rows={5} className="w-full bg-[#0a0a1a] border border-[#2a2a4a] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-[#6c5ce7] focus:outline-none resize-none" placeholder="채용공고 내용을 붙여넣으세요..." required/></div>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setCurrentPage("dashboard")} className="px-5 py-3 border border-[#2a2a4a] text-gray-400 rounded-xl hover:bg-[#2a2a4a]/50">취소</button>
            <button type="submit" disabled={uploading} className="flex-1 bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
              {uploading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> 제출중...</> : <><Icons.Send /> 컨설팅 요청 제출</>}
            </button>
          </div>
        </form>
      </div>
    );
  };

  // ---- STUDENT RESULT ----
  const StudentResult = () => {
    const request = mockDB.query("consulting_requests", (r: any) => r.id === selectedRequestId)[0];
    const result = mockDB.query("results", (r: any) => r.request_id === selectedRequestId)[0];
    if (!request || !result) return <div className="text-center py-20 text-gray-500"><p>결과를 찾을 수 없습니다.</p><button onClick={() => setCurrentPage("dashboard")} className="mt-4 text-[#a78bfa] hover:underline">돌아가기</button></div>;
    const handleDownload = () => {
      const blob = new Blob([`AI Job Navigator K — Consulting Report\n${"=".repeat(50)}\nStudent: ${currentUser.full_name}\nCompany: ${request.target_company}\nDate: ${new Date().toLocaleDateString("ko-KR")}\n${"=".repeat(50)}\n\n${result.final_content}`], { type: "text/plain;charset=utf-8" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `report_${request.target_company}.txt`; a.click();
    };
    return (
      <div className="max-w-3xl mx-auto animate-fade-in">
        <button onClick={() => setCurrentPage("dashboard")} className="text-gray-400 hover:text-white text-sm mb-4">← 대시보드</button>
        <div className="bg-[#12122a] border border-[#2a2a4a] rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#6c5ce7]/20 to-[#a855f7]/20 border-b border-[#2a2a4a] px-6 py-5">
            <h1 className="text-lg font-black text-white">{request.target_company} 맞춤 컨설팅 보고서</h1>
            <p className="text-gray-400 text-sm mt-1">{currentUser.full_name} · {new Date(result.updated_at).toLocaleDateString("ko-KR")}</p>
          </div>
          <div className="px-6 py-5">
            {result.final_content.split("\n").map((line: string, i: number) => {
              if (line.startsWith("# ")) return <h1 key={i} className="text-xl font-bold text-white mt-5 mb-2">{line.slice(2)}</h1>;
              if (line.startsWith("## ")) return <h2 key={i} className="text-base font-bold text-[#a78bfa] mt-4 mb-2">{line.slice(3)}</h2>;
              if (line.startsWith("- ")) return <li key={i} className="text-gray-300 ml-4 mb-1 text-sm">{line.slice(2)}</li>;
              if (line.startsWith("Q")) return <p key={i} className="text-white font-medium mt-2 text-sm">{line}</p>;
              if (line.trim() === "") return <br key={i}/>;
              return <p key={i} className="text-gray-300 text-sm leading-relaxed">{line}</p>;
            })}
          </div>
          <div className="px-6 py-4 border-t border-[#2a2a4a]">
            <button onClick={handleDownload} className="flex items-center gap-2 bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90"><Icons.Download /> 다운로드</button>
          </div>
        </div>
      </div>
    );
  };

  // ---- CONSULTANT DASHBOARD ----
  const ConsultantDashboard = () => {
    const all = mockDB.get("consulting_requests");
    const stats = { total: all.length, pending: all.filter((r: any) => r.status === "pending").length, in_progress: all.filter((r: any) => r.status === "in_progress").length, completed: all.filter((r: any) => r.status === "completed").length };
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-black text-white">컨설턴트 대시보드</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[{ l: "전체", v: stats.total, c: "text-[#a78bfa]", bg: "from-[#6c5ce7]/20 to-[#6c5ce7]/5", bd: "border-[#6c5ce7]/20" }, { l: "대기중", v: stats.pending, c: "text-amber-400", bg: "from-amber-500/20 to-amber-500/5", bd: "border-amber-500/20" }, { l: "진행중", v: stats.in_progress, c: "text-blue-400", bg: "from-blue-500/20 to-blue-500/5", bd: "border-blue-500/20" }, { l: "완료", v: stats.completed, c: "text-emerald-400", bg: "from-emerald-500/20 to-emerald-500/5", bd: "border-emerald-500/20" }].map(x => (
            <div key={x.l} className={`bg-gradient-to-br ${x.bg} border ${x.bd} rounded-2xl p-4 md:p-5`}><p className="text-gray-400 text-xs md:text-sm">{x.l}</p><p className={`text-2xl md:text-3xl font-black mt-1 ${x.c}`}>{x.v}</p></div>
          ))}
        </div>
        <div className="bg-[#12122a] border border-[#2a2a4a] rounded-2xl overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-[#2a2a4a]"><h2 className="font-bold text-white">요청 관리</h2></div>
          <div className="divide-y divide-[#2a2a4a]">
            {all.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((req: any) => {
              const student = mockDB.query("users", (u: any) => u.id === req.student_id)[0];
              return (
                <div key={req.id} className="px-4 md:px-6 py-4 hover:bg-[#1a1a3a]/50 transition-colors">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div><span className="text-white font-semibold text-sm">{student?.full_name}</span><span className="text-gray-500 mx-2">·</span><span className="text-gray-300 text-sm">{req.target_company}</span></div>
                    <StatusBadge status={req.status} />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-gray-600 text-xs">{new Date(req.created_at).toLocaleDateString("ko-KR")}</p>
                    <button onClick={() => { setSelectedRequestId(req.id); setCurrentPage("workspace"); setSidebarOpen(false); }} className="text-[#a78bfa] hover:text-white text-xs font-medium">워크스페이스 →</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ---- CONSULTANT WORKSPACE ----
  const ConsultantWorkspace = () => {
    const request = mockDB.query("consulting_requests", (r: any) => r.id === selectedRequestId)[0];
    const docs = mockDB.query("documents", (d: any) => d.request_id === selectedRequestId);
    const student = request ? mockDB.query("users", (u: any) => u.id === request.student_id)[0] : null;
    const prompts = mockDB.get("ai_prompts");
    const existingResult = mockDB.query("results", (r: any) => r.request_id === selectedRequestId)[0];
    const [selectedPromptId, setSelectedPromptId] = useState("");
    const [aiOutput, setAiOutput] = useState(existingResult?.final_content || "");
    const [isGenerating, setIsGenerating] = useState(false);
    const [saved, setSaved] = useState(false);
    const outputRef = useRef<HTMLTextAreaElement>(null);

    const handleGenerate = async () => {
      const prompt = prompts.find((p: any) => p.id === selectedPromptId);
      if (!prompt || !request) return;
      setIsGenerating(true); setAiOutput("");
      const userContent = `[학생] ${student?.full_name}\n[기업] ${request.target_company}\n[채용공고]\n${request.job_description_url_or_text}\n${docs.map((d: any) => `[${d.document_type}]\n${d.parsed_text}`).join("\n")}`;
      try {
        const stream = await callGeminiAPI(process.env.NEXT_PUBLIC_GEMINI_API_KEY, prompt.system_prompt, userContent);
        let full = "";
        for await (const chunk of stream) { full += chunk; setAiOutput(full); }
      } catch (err: any) { setAiOutput(`오류: ${err.message}`); }
      setIsGenerating(false);
    };

    const handleSave = () => {
      if (existingResult) mockDB.update("results", existingResult.id, { final_content: aiOutput, updated_at: new Date().toISOString() });
      else mockDB.insert("results", { request_id: selectedRequestId, ai_draft: aiOutput, final_content: aiOutput, updated_at: new Date().toISOString() });
      mockDB.update("consulting_requests", selectedRequestId!, { status: "completed" });
      setSaved(true); setTimeout(() => setSaved(false), 2000);
    };

    if (!request) return <div className="text-center py-20 text-gray-500"><button onClick={() => setCurrentPage("dashboard")} className="text-[#a78bfa] hover:underline">← 요청을 선택해주세요</button></div>;

    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div><button onClick={() => setCurrentPage("dashboard")} className="text-gray-400 hover:text-white text-xs mb-1">← 대시보드</button><h1 className="text-lg font-black text-white">{student?.full_name} · {request.target_company}</h1></div>
          <StatusBadge status={request.status}/>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left - Data */}
          <div className="bg-[#12122a] border border-[#2a2a4a] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2a2a4a] text-sm font-semibold text-white">📂 학생 데이터</div>
            <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
              <div><p className="text-xs text-gray-400 mb-1 uppercase font-semibold">채용공고</p><div className="bg-[#0a0a1a] rounded-xl p-3 text-gray-300 text-sm whitespace-pre-wrap border border-[#2a2a4a]">{request.job_description_url_or_text}</div></div>
              {docs.map((doc: any) => (
                <div key={doc.id}><p className="text-xs text-gray-400 mb-1 uppercase font-semibold">📄 {doc.document_type}</p><div className="bg-[#0a0a1a] rounded-xl p-3 text-gray-300 text-sm whitespace-pre-wrap border border-[#2a2a4a] max-h-48 overflow-y-auto">{doc.parsed_text}</div></div>
              ))}
            </div>
          </div>
          {/* Right - AI */}
          <div className="bg-[#12122a] border border-[#2a2a4a] rounded-2xl overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-[#2a2a4a] text-sm font-semibold text-white">✨ AI 워크스페이스</div>
            <div className="px-4 py-3 border-b border-[#2a2a4a] flex items-center gap-2">
              <select value={selectedPromptId} onChange={e => setSelectedPromptId(e.target.value)} className="flex-1 bg-[#0a0a1a] border border-[#2a2a4a] rounded-lg px-3 py-2 text-white text-sm focus:border-[#6c5ce7] focus:outline-none">
                <option value="">프롬프트 선택...</option>
                {prompts.map((p: any) => <option key={p.id} value={p.id}>[{p.category}] {p.title}</option>)}
              </select>
              <button onClick={handleGenerate} disabled={isGenerating || !selectedPromptId} className="bg-gradient-to-r from-[#6c5ce7] to-[#a855f7] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-40 whitespace-nowrap flex items-center gap-1">
                {isGenerating ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <Icons.Sparkle/>} {isGenerating ? "생성중" : "AI 생성"}
              </button>
            </div>
            <textarea ref={outputRef} value={aiOutput} onChange={e => setAiOutput(e.target.value)} className="flex-1 min-h-[300px] bg-[#0a0a1a] m-4 p-4 rounded-xl text-gray-200 text-sm leading-relaxed resize-none focus:outline-none border border-[#2a2a4a] font-mono" placeholder="AI 결과가 여기에 표시됩니다..."/>
            <div className="px-4 py-3 border-t border-[#2a2a4a] flex items-center gap-2 flex-wrap">
              <button onClick={handleSave} disabled={!aiOutput} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 disabled:opacity-40">
                {saved ? <><Icons.Check/> 저장완료!</> : <><Icons.Send/> 최종 저장</>}
              </button>
              <button disabled={!aiOutput} className="flex items-center gap-1.5 border border-[#2a2a4a] text-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-[#2a2a4a]/50 disabled:opacity-40"><Icons.Google/> Docs 내보내기</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ---- PROMPT LIBRARY ----
  const PromptLibrary = () => {
    const [prompts, setPrompts] = useState(mockDB.get("ai_prompts"));
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState({ category: "", title: "", system_prompt: "" });
    const refresh = () => setPrompts([...mockDB.get("ai_prompts")]);
    const handleSave = () => {
      if (!form.category || !form.title || !form.system_prompt) return;
      if (editing) mockDB.update("ai_prompts", editing, form); else mockDB.insert("ai_prompts", { ...form, created_by: currentUser.id });
      refresh(); setEditing(null); setForm({ category: "", title: "", system_prompt: "" });
    };
    const handleDelete = (id: string) => { mockDB.delete("ai_prompts", id); refresh(); };
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between"><div><h1 className="text-2xl font-black text-white">AI 프롬프트 라이브러리</h1><p className="text-gray-400 mt-1 text-sm">Gemini API 시스템 프롬프트 관리</p></div></div>
        <div className="bg-[#12122a] border border-[#2a2a4a] rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-white text-sm">{editing ? "프롬프트 수정" : "새 프롬프트"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className="text-xs text-gray-300 mb-1 block">카테고리</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-[#0a0a1a] border border-[#2a2a4a] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#6c5ce7] focus:outline-none"><option value="">선택...</option>{["자기소개서","모의면접","포트폴리오","직무기술서","이력서"].map(c => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className="text-xs text-gray-300 mb-1 block">제목</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-[#0a0a1a] border border-[#2a2a4a] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:border-[#6c5ce7] focus:outline-none" placeholder="프롬프트 제목"/></div>
          </div>
          <div><label className="text-xs text-gray-300 mb-1 block">시스템 프롬프트</label><textarea value={form.system_prompt} onChange={e => setForm({...form, system_prompt: e.target.value})} rows={5} className="w-full bg-[#0a0a1a] border border-[#2a2a4a] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:border-[#6c5ce7] focus:outline-none resize-none font-mono" placeholder="Gemini API에 주입할 지시문..."/></div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-[#6c5ce7] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#5b4bd6]">{editing ? "수정" : "저장"}</button>
            {editing && <button onClick={() => { setEditing(null); setForm({ category: "", title: "", system_prompt: "" }); }} className="text-gray-400 text-sm hover:text-white">취소</button>}
          </div>
        </div>
        <div className="space-y-3">
          {prompts.map((p: any) => (
            <div key={p.id} className="bg-[#12122a] border border-[#2a2a4a] rounded-2xl p-4 hover:border-[#3a3a5a] transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1"><div className="flex items-center gap-2 mb-1"><span className="bg-[#6c5ce7]/15 text-[#a78bfa] text-xs font-medium px-2 py-0.5 rounded-md">{p.category}</span><span className="font-semibold text-white text-sm">{p.title}</span></div><p className="text-gray-500 text-xs mt-1 line-clamp-2">{p.system_prompt}</p></div>
                <div className="flex gap-1 ml-3"><button onClick={() => { setEditing(p.id); setForm({ category: p.category, title: p.title, system_prompt: p.system_prompt }); }} className="p-2 text-gray-500 hover:text-[#a78bfa] rounded-lg"><Icons.Edit/></button><button onClick={() => handleDelete(p.id)} className="p-2 text-gray-500 hover:text-red-400 rounded-lg"><Icons.Trash/></button></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ---- STATISTICS ----
  const Statistics = () => {
    const all = mockDB.get("consulting_requests");
    const statusData = [{ name: "대기중", value: all.filter((r: any) => r.status === "pending").length, color: "#f59e0b" }, { name: "진행중", value: all.filter((r: any) => r.status === "in_progress").length, color: "#3b82f6" }, { name: "완료", value: all.filter((r: any) => r.status === "completed").length, color: "#10b981" }];
    const total = all.length;
    const companyCount: Record<string, number> = {};
    all.forEach((r: any) => { companyCount[r.target_company] = (companyCount[r.target_company] || 0) + 1; });
    const companyData = Object.entries(companyCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const maxVal = Math.max(...companyData.map(d => d[1]), 1);
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-black text-white">통계 대시보드</h1>
          <button className="flex items-center gap-2 border border-[#2a2a4a] text-gray-300 px-4 py-2 rounded-xl text-sm hover:bg-[#2a2a4a]/50"><Icons.Google/> Sheets 내보내기</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#12122a] border border-[#2a2a4a] rounded-2xl p-6">
            <h2 className="font-bold text-white mb-6">요청 상태 분포</h2>
            <div className="flex items-center justify-center gap-8">
              <div className="relative w-36 h-36">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">{statusData.reduce((acc: any, item, i) => { const pct = total > 0 ? (item.value / total) * 100 : 0; acc.els.push(<circle key={i} cx="18" cy="18" r="15.9" fill="none" stroke={item.color} strokeWidth="3.5" strokeDasharray={`${pct} ${100-pct}`} strokeDashoffset={-acc.off}/>); acc.off += pct; return acc; }, { els: [] as any[], off: 0 }).els}</svg>
                <div className="absolute inset-0 flex items-center justify-center"><div className="text-center"><p className="text-2xl font-black text-white">{total}</p><p className="text-xs text-gray-500">전체</p></div></div>
              </div>
              <div className="space-y-3">{statusData.map(item => <div key={item.name} className="flex items-center gap-3"><span className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}/><span className="text-gray-300 text-sm">{item.name}</span><span className="text-white font-bold">{item.value}</span></div>)}</div>
            </div>
          </div>
          <div className="bg-[#12122a] border border-[#2a2a4a] rounded-2xl p-6">
            <h2 className="font-bold text-white mb-6">인기 타겟 기업 TOP 5</h2>
            <div className="space-y-4">{companyData.map(([name, val]) => (
              <div key={name}><div className="flex justify-between mb-1"><span className="text-gray-300 text-sm">{name}</span><span className="text-[#a78bfa] font-bold text-sm">{val}건</span></div><div className="h-3 bg-[#0a0a1a] rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-[#6c5ce7] to-[#a855f7]" style={{width: `${(val/maxVal)*100}%`}}/></div></div>
            ))}</div>
          </div>
        </div>
      </div>
    );
  };

  // ---- NAVIGATION ----
  const navItems = currentUser.role === "student"
    ? [{ id: "dashboard", label: "대시보드", icon: <Icons.Dashboard/> }, { id: "upload", label: "컨설팅 요청", icon: <Icons.Upload/> }, { id: "result", label: "결과 보관함", icon: <Icons.Folder/> }]
    : [{ id: "dashboard", label: "요청 관리", icon: <Icons.Dashboard/> }, { id: "workspace", label: "AI 워크스페이스", icon: <Icons.Workspace/> }, { id: "prompts", label: "프롬프트 라이브러리", icon: <Icons.Prompt/> }, { id: "statistics", label: "통계", icon: <Icons.Chart/> }];

  const renderPage = () => {
    if (currentUser.role === "student") { switch (currentPage) { case "upload": return <StudentUpload/>; case "result": return <StudentResult/>; default: return <StudentDashboard/>; } }
    else { switch (currentPage) { case "workspace": return <ConsultantWorkspace/>; case "prompts": return <PromptLibrary/>; case "statistics": return <Statistics/>; default: return <ConsultantDashboard/>; } }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex">
      {/* Mobile Menu Button */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="fixed top-4 left-4 z-50 lg:hidden bg-[#12122a] border border-[#2a2a4a] p-2 rounded-xl text-white">
        {sidebarOpen ? <Icons.X/> : <Icons.Menu/>}
      </button>

      {/* Sidebar Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}/>}

      {/* Sidebar */}
      <aside className={`fixed h-full z-40 w-60 bg-[#0f0f23] border-r border-[#1a1a3a] flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="px-5 py-5 border-b border-[#1a1a3a]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[#6c5ce7] to-[#a855f7] rounded-xl flex items-center justify-center shadow-lg shadow-[#6c5ce7]/20"><span className="text-sm font-black text-white">N</span></div>
            <div><h1 className="text-xs font-bold text-white leading-tight">AI Job Navigator</h1><p className="text-xs text-[#a78bfa]">{currentUser.role === "student" ? "Student" : "Consultant"}</p></div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setCurrentPage(item.id); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${currentPage === item.id ? "bg-[#6c5ce7]/15 text-[#a78bfa]" : "text-gray-400 hover:text-gray-200 hover:bg-[#1a1a3a]"}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-[#1a1a3a] space-y-1">
          <div className="flex items-center gap-3 px-3 py-2"><div className="w-7 h-7 bg-[#6c5ce7]/20 rounded-lg flex items-center justify-center text-[#a78bfa]"><Icons.User/></div><div><p className="text-xs text-white font-medium truncate">{currentUser.full_name}</p><p className="text-xs text-gray-500 truncate">{currentUser.email}</p></div></div>
          <button onClick={() => setCurrentUser(null)} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10"><Icons.Logout/> 로그아웃</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-60 p-4 md:p-6 lg:p-8 pt-16 lg:pt-8">
        {renderPage()}
      </main>
    </div>
  );
}
