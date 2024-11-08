import { NextResponse } from "next/server";

export async function GET(request: Request) {
   try {
      return NextResponse.json({ success: true, version: "0.2.0", mode: "staging" }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, version: "Gagal mendapatkan version, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}
