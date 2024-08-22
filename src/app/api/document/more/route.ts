import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { NextResponse } from "next/server";


// MOVE ITEM
export async function POST(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { path, dataItem } = (await request.json());


      if (path != "home") {
         const cekPath = await prisma.divisionDocumentFolderFile.count({
            where: {
               isActive: true,
               id: path
            }
         })

         if (cekPath == 0) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan path, data tidak ditemukan" }, { status: 404 });
         }
      }

      for (let i = 0; i < dataItem.length; i++) {
         const id = dataItem[i].id;
         const cekFile = await prisma.divisionDocumentFolderFile.update({
            where: {
               id: id
            },
            data: {
               path: path
            }
         })
      }


      return NextResponse.json({ success: true, message: "Berhasil memindahkan item" }, { status: 200 });
   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal memindahkan item, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
};