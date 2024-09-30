import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import _ from "lodash";
import moment from "moment";
import "moment/locale/id";
import { NextResponse } from "next/server";

// GET ALL NOTIFIKASI
export async function GET(request: Request) {
   try {
      const user = await funGetUserByCookies();
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { searchParams } = new URL(request.url);
      const page = searchParams.get('page');
      const dataSkip = Number(page) * 10 - 10;

      const announcements = await prisma.notifications.findMany({
         skip: dataSkip,
         take: 10,
         where: {
            isActive: true,
            idUserTo: user.id
         },
         orderBy: [
            {
               isRead: 'asc'
            },
            {
               createdAt: 'desc'
            }
         ]

      });

      const allData = announcements.map((v: any) => ({
         ..._.omit(v, ["createdAt"]),
         createdAt: moment(v.createdAt).format("ll")
      }))

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan notifikasi", data: allData, }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan notifikasi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}



// UPDATE READ NOTIFIKASI
export async function PUT(request: Request, context: { params: { id: string } }) {
   try {
       const user = await funGetUserByCookies()
       if (user.id == undefined) {
           return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
       }
       const { id } = await request.json();
       const data = await prisma.notifications.count({
           where: {
               id: id,
           },
       });

       if (data == 0) {
           return NextResponse.json(
               {
                   success: false,
                   message: "Gagal mendapatkan data, data tidak ditemukan",
               },
               { status: 404 }
           );
       }

       const result = await prisma.notifications.update({
           where: {
               id: id,
           },
           data: {
               isRead: true,
           },
       });

       // create log user
       const log = await createLogUser({ act: 'UPDATE', desc: 'User membaca notifikasi', table: 'notifications', data: id })

       return NextResponse.json( { success: true, message: "Berhasil mendapatkan notifikasi", }, { status: 200 } );

   } catch (error) {
       console.error(error);
       return NextResponse.json({ success: false, message: "Gagal mendapatkan notifikasi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}