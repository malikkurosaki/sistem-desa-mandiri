import { NextResponse } from "next/server";

export async function GET(request: Request) {
   return NextResponse.json({ success: false, message: "Gagal mendapatkan calender, data tidak ditemukan" }, { status: 404 });
}