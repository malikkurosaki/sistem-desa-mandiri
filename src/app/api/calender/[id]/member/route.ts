import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";


// GET ONE DATA KALENDER BY ID KALENDER 
export async function GET(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { id } = context.params

      const cek = await prisma.divisionCalendar.count({
         where: {
            id: id
         }
      })

      if (cek == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Gagal mendapatkan kalender, data tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const data = await prisma.divisionCalendar.findUnique({
         where: {
            id: id
         },
         select: {
            id: true,
            title: true,
            desc: true,
            timeStart: true,
            dateStart: true,
            timeEnd: true,
            createdAt: true,
            linkMeet: true,
            repeatValue: true,
            repeatEventTyper: true,
         }
      });

      const { ...dataCalender } = data
      const timeStart = moment.utc(dataCalender?.timeStart).format("HH:mm")
      const timeEnd = moment.utc(dataCalender?.timeEnd).format("HH:mm")

      const result = { ...dataCalender, timeStart, timeEnd }

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan kalender", data: result }, { status: 200 });

   } catch (error) {
      return NextResponse.json( { success: false, message: "Gagal mendapatkan kalender, data tidak ditemukan (error: 500)", }, { status: 500 }
      );
   }
}


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
      return NextResponse.json({ success: false, message: "Gagal menambah anggota, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }


}

// MENGELUARKAN ANGGOTA
export async function DELETE(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { id } = context.params;
      const { idUser } = (await request.json());

      const data = await prisma.divisionCalendar.count({
         where: {
            id: id,
         },
      });


      if (data == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Gagal mengeluarkan anggota, data tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const del = await prisma.divisionCalendarMember.deleteMany({
         where: {
            idUser: idUser,
            idCalendar: id
         }
      })


      // create log user
      const log = await createLogUser({ act: 'DELETE', desc: 'User mengeluarkan anggota acara kalender', table: 'divisionCalendar', data: String(id) })


      return NextResponse.json(
         {
            success: true,
            message: "Berhasil mengeluarkan anggota",
         },
         { status: 200 }
      );
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mengeluarkan anggota, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}