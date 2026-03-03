import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !privateKey || !sheetId) {
      return NextResponse.json(
        { error: "Google API credentials not configured. Set GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID in environment variables." },
        { status: 500 }
      );
    }

    // In production, use googleapis package:
    // const { google } = require("googleapis");
    // const auth = new google.auth.JWT(clientEmail, null, privateKey, ["https://www.googleapis.com/auth/spreadsheets"]);
    // const sheets = google.sheets({ version: "v4", auth });
    // await sheets.spreadsheets.values.append({ spreadsheetId: sheetId, range: "Sheet1!A1", valueInputOption: "RAW", requestBody: { values: data } });

    return NextResponse.json({ success: true, message: "Data exported to Google Sheets" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
