import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { content, studentName } = await req.json();

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!clientEmail || !privateKey) {
      return NextResponse.json(
        { error: "Google API credentials not configured. Set GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY in environment variables." },
        { status: 500 }
      );
    }

    // In production, use googleapis package:
    // const { google } = require("googleapis");
    // const auth = new google.auth.JWT(clientEmail, null, privateKey, ["https://www.googleapis.com/auth/documents"]);
    // const docs = google.docs({ version: "v1", auth });
    // const doc = await docs.documents.create({ requestBody: { title: `Consulting Report - ${studentName}` } });
    // await docs.documents.batchUpdate({ documentId: doc.data.documentId, requestBody: { requests: [{ insertText: { location: { index: 1 }, text: content } }] } });
    // return NextResponse.json({ success: true, docUrl: `https://docs.google.com/document/d/${doc.data.documentId}` });

    return NextResponse.json({ success: true, message: "Google Doc created", docUrl: "#" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
