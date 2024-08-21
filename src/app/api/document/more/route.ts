import { funGetUserByCookies } from "@/module/auth";
import { NextResponse } from "next/server";

// MOVE ITEM
export async function POST(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      return NextResponse.json({ success: true, message: "Berhasil memindahkan item" }, { status: 200 });
   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal memindahkan item, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
};