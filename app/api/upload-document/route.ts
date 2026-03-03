import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const requestId = formData.get("request_id") as string;
    const documentType = formData.get("document_type") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Read file as buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Parse PDF text
    let parsedText = "";
    try {
      const pdfParse = require("pdf-parse");
      const data = await pdfParse(buffer);
      parsedText = data.text
        .replace(/\s+/g, " ")
        .replace(/\n\s*\n/g, "\n\n")
        .trim();
    } catch {
      parsedText = "[PDF 텍스트 추출 실패 - 수동 입력 필요]";
    }

    // In production, upload to Supabase Storage:
    // const { supabase } = require("@/lib/supabase");
    // const fileName = `${requestId}/${Date.now()}_${file.name}`;
    // const { data: storageData } = await supabase.storage.from("student-documents").upload(fileName, buffer);
    // const fileUrl = supabase.storage.from("student-documents").getPublicUrl(fileName).data.publicUrl;
    // await supabase.from("documents").insert({ request_id: requestId, file_url: fileUrl, parsed_text: parsedText, document_type: documentType });

    return NextResponse.json({
      success: true,
      parsedText: parsedText.substring(0, 500) + "...",
      fileName: file.name,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
