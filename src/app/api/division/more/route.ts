import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import { NextResponse } from "next/server";

// GET LIST DIVISI BY ID DIVISI (CONTOH : UNTUK SHARE DOKUMEN)
export async function GET(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { searchParams } = new URL(request.url);
      const idDivision = searchParams.get("division");
      const name = searchParams.get('search');

      const dataDivision = await prisma.division.findUnique({
         where: {
            id: String(idDivision),
            isActive: true
         }
      })

      if (!dataDivision) {
         return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, data tidak ditemukan", }, { status: 404 });
      }

      const data = await prisma.division.findMany({
         where: {
            isActive: true,
            idGroup: dataDivision.idGroup,
            name: {
               contains: (name == undefined || name == "null") ? "" : name,
               mode: "insensitive"
            }
         },
         select: {
            id: true,
            name: true,
         },
         orderBy: {
            name: "asc"
         }
      });

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan divisi", data }, { status: 200 });

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}