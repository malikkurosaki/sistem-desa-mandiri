import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { NextResponse } from "next/server";


// GET ONE DATA DIVISI :: UNTUK TAMPIL DATA DI HALAMAN EDIT
export async function GET(request: Request, context: { params: { id: string } }) {
   try {
      const { id } = context.params;
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const data = await prisma.division.findUnique({
         where: {
            id: String(id),
            isActive: true
         }
      });

      if (!data) {
         return NextResponse.json( { success: false, message: "Gagal mendapatkan divisi, data tidak ditemukan", }, { status: 404 } );
      }

      return NextResponse.json( { success: true, message: "Berhasil mendapatkan divisi", data, }, { status: 200 } );
      
   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}