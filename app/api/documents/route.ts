import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 문서 저장
export async function POST(req: NextRequest) {
  // ✅ 함수 안에서 클라이언트 생성 (매 요청마다 환경변수 새로 읽음)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: "환경변수 누락", url: !!supabaseUrl, key: !!supabaseKey },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { user_email, user_name, document_type, title, content } =
      await req.json();

    const { data, error } = await supabase
      .from("generated_documents")
      .insert([{ user_email, user_name, document_type, title, content }])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message, code: error.code, details: error.details },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}