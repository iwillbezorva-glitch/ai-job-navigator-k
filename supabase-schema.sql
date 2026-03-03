-- ============================================================
-- AI Job Navigator K — Supabase Database Schema
-- ============================================================
-- Run this in your Supabase SQL Editor to set up the database.
-- ============================================================

-- 1. USERS TABLE (Public profile mirroring auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'consultant')),
  full_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CONSULTING REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.consulting_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  target_company TEXT NOT NULL,
  job_description_url_or_text TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DOCUMENTS TABLE (Student uploaded files)
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.consulting_requests(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  parsed_text TEXT,
  document_type TEXT NOT NULL CHECK (document_type IN ('resume', 'cover_letter', 'portfolio', 'other')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. AI PROMPTS TABLE (Internal Gem System)
CREATE TABLE IF NOT EXISTS public.ai_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  system_prompt TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. RESULTS TABLE (Final consulting output)
CREATE TABLE IF NOT EXISTS public.results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.consulting_requests(id) ON DELETE CASCADE,
  ai_draft TEXT,
  final_content TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consulting_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user's role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER;

-- === USERS POLICIES ===
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Consultants can view all users"
  ON public.users FOR SELECT
  USING (public.get_user_role() = 'consultant');

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (id = auth.uid());

-- === CONSULTING REQUESTS POLICIES ===
CREATE POLICY "Students can view own requests"
  ON public.consulting_requests FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "Consultants can view all requests"
  ON public.consulting_requests FOR SELECT
  USING (public.get_user_role() = 'consultant');

CREATE POLICY "Students can create own requests"
  ON public.consulting_requests FOR INSERT
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Consultants can update all requests"
  ON public.consulting_requests FOR UPDATE
  USING (public.get_user_role() = 'consultant');

-- === DOCUMENTS POLICIES ===
CREATE POLICY "Students can view own documents"
  ON public.documents FOR SELECT
  USING (
    request_id IN (
      SELECT id FROM public.consulting_requests WHERE student_id = auth.uid()
    )
  );

CREATE POLICY "Consultants can view all documents"
  ON public.documents FOR SELECT
  USING (public.get_user_role() = 'consultant');

CREATE POLICY "Students can upload own documents"
  ON public.documents FOR INSERT
  WITH CHECK (
    request_id IN (
      SELECT id FROM public.consulting_requests WHERE student_id = auth.uid()
    )
  );

-- === AI PROMPTS POLICIES ===
CREATE POLICY "Consultants can do everything with prompts"
  ON public.ai_prompts FOR ALL
  USING (public.get_user_role() = 'consultant');

-- === RESULTS POLICIES ===
CREATE POLICY "Students can view own results"
  ON public.results FOR SELECT
  USING (
    request_id IN (
      SELECT id FROM public.consulting_requests WHERE student_id = auth.uid()
    )
  );

CREATE POLICY "Consultants can manage all results"
  ON public.results FOR ALL
  USING (public.get_user_role() = 'consultant');

-- ============================================================
-- STORAGE BUCKET
-- ============================================================
-- Run this separately or via Supabase Dashboard:
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('student-documents', 'student-documents', false);

-- Storage RLS:
-- CREATE POLICY "Students can upload own files"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'student-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- CREATE POLICY "Authenticated users can read files"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'student-documents' AND auth.role() = 'authenticated');

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_requests_student ON public.consulting_requests(student_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON public.consulting_requests(status);
CREATE INDEX IF NOT EXISTS idx_documents_request ON public.documents(request_id);
CREATE INDEX IF NOT EXISTS idx_results_request ON public.results(request_id);
CREATE INDEX IF NOT EXISTS idx_prompts_category ON public.ai_prompts(category);

-- ============================================================
-- TRIGGER: Auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ai_prompts_updated_at
  BEFORE UPDATE ON public.ai_prompts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_results_updated_at
  BEFORE UPDATE ON public.results
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
