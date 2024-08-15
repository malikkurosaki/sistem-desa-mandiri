import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _, { ceil } from "lodash";
import { NextResponse } from "next/server";

// GET ALL DATA TUGAS DIVISI
export async function GET(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { searchParams } = new URL(request.url);
      const name = searchParams.get('search');
      const divisi = searchParams.get('division');
      const status = searchParams.get('status');

      const cek = await prisma.division.count({
         where: {
            isActive: true,
            id: String(divisi)
         }
      })

      if (cek == 0) {
         return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, data tidak ditemukan", }, { status: 404 });
      }

      const data = await prisma.divisionProject.findMany({
         where: {
            isActive: true,
            idDivision: String(divisi),
            status: (status == "0" || status == "1" || status == "2" || status == "3") ? Number(status) : 0,
            title: {
               contains: (name == undefined || name == "null") ? "" : name,
               mode: "insensitive"
            }
         },
         select: {
            id: true,
            title: true,
            desc: true,
            status: true,
            DivisionProjectTask: {
               where: {
                  isActive: true
               },
               select: {
                  title: true
               }
            },
            DivisionProjectMember: {
               where: {
                  isActive: true
               },
               select: {
                  idUser: true
               }
            }
         }
      });

      const formatData = data.map((v: any) => ({
         ..._.omit(v, ["DivisionProjectTask", "DivisionProjectMember"]),
         progress: ceil(v.DivisionProjectTask.filter((i: any) => i.status === 1).length / v.DivisionProjectTask.length),
         member: v.DivisionProjectMember.length
      }))

      console.log('amalia', formatData)


      return NextResponse.json({ success: true, message: "Berhasil mendapatkan divisi", data, }, { status: 200 });

   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}