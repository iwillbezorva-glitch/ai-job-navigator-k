import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 문서 저장
export async function POST(req: NextRequest) {
  try {
    const { user_email, user_name, document_type, title, content } = await req.json();

    const { data, error } = await supabase
      .from("generated_documents")
      .insert([{ user_email, user_name, document_type, title, content }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, document: data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 문서 불러오기
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const user_email = searchParams.get("user_email");

    let query = supabase
      .from("generated_documents")
      .select("*")
      .order("created_at", { ascending: false });

    if (user_email) {
      query = query.eq("user_email", user_email);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ success: true, documents: data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}