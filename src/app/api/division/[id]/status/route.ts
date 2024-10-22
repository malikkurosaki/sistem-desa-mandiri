import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import { NextResponse } from "next/server";

export async function POST(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }
      const { id } = context.params;
      const { isActive } = (await request.json());
      const data = await prisma.division.count({
         where: {
            id: id,
         },
      });

      if (data == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Edit status divisi gagal, data tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const update = await prisma.division.update({
         where: {
            id: id,
         },
         data: {
            isActive: !isActive,
         },
      });

      // create log user
      const log = await createLogUser({ act: 'UPDATE', desc: 'User mengedit status data divisi', table: 'division', data: id })

      return NextResponse.json({ success: true, message: "Status divisi berhasil diupdate", }, { status: 200 });

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mengubah status divisi, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}