import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export type UserRole = "student" | "consultant";
export type RequestStatus = "pending" | "in_progress" | "completed";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  created_at: string;
}

export interface ConsultingRequest {
  id: string;
  student_id: string;
  target_company: string;
  job_description_url_or_text: string;
  status: RequestStatus;
  created_at: string;
}

export interface Document {
  id: string;
  request_id: string;
  file_url: string;
  parsed_text: string;
  document_type: string;
  created_at: string;
}

export interface AIPrompt {
  id: string;
  category: string;
  title: string;
  system_prompt: string;
  created_by: string;
  created_at: string;
}

export interface Result {
  id: string;
  request_id: string;
  ai_draft: string;
  final_content: string;
  updated_at: string;
}
