import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'consultant';
  created_at: string;
}

export interface GeneratedDocument {
  id: string;
  user_email: string;
  user_name: string;
  document_type: string;
  title: string;
  content: string;
  created_at: string;
}