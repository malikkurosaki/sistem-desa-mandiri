import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import _ from "lodash";
import { NextResponse } from "next/server";

// TAMBAH MEMBER KALENDER
export async function POST(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { id } = context.params
      const member = await request.json()

      const cek = await prisma.divisionCalendar.count({
         where: {
            id: id
         }
      })

      if (cek == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Gagal menambahkan anggota, data tidak ditemukan",
            },
            { status: 404 }
         );
      }


      if (member.length > 0) {
         const dataMember = member.map((v: any) => ({
            ..._.omit(v, ["idUser", "name", "img"]),
            idCalendar: id,
            idUser: v.idUser,
         }))

         const insertMember = await prisma.divisionCalendarMember.createMany({
            data: dataMember
         })
      }

      // create log user
      const log = await createLogUser({ act: 'CREATE', desc: 'User menambah anggota kalender', table: 'divisionCalendar', data: String(id) })

      return NextResponse.json({ success: true, message: "Berhasil menambahkan anggota", }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal menambah anggota, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }


}