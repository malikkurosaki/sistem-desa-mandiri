import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";

// GET DETAIL TASK DIVISI / GET ONE
export async function GET(request: Request, context: { params: { id: string } }) {
   try {
      let allData
      const { id } = context.params;
      const user = await funGetUserByCookies()
      const { searchParams } = new URL(request.url);
      const kategori = searchParams.get("cat");

      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const data = await prisma.divisionProject.findUnique({
         where: {
            id: String(id),
            isActive: true
         }
      });

      if (!data) {
         return NextResponse.json({ success: false, message: "Gagal mendapatkan tugas, data tidak ditemukan", }, { status: 404 });
      }

      if (kategori == "data") {
         allData = data
      } else if (kategori == "progress") {
         const dataProgress = await prisma.divisionProjectTask.findMany({
            where: {
               isActive: true,
               idProject: String(id)
            },
            orderBy:{
               updatedAt: 'desc'
            }
         })

         const semua = dataProgress.length
         const selesai = _.filter(dataProgress, { status: 1 }).length
         const progress = Math.ceil((selesai / semua) * 100)

         allData = {
            progress: progress,
            lastUpdate: moment(dataProgress[0].updatedAt).format("DD MMMM YYYY"),
         }
      } else if (kategori == "task") {
         const dataProgress = await prisma.divisionProjectTask.findMany({
            where: {
               isActive: true,
               idProject: String(id)
            },
            select: {
               id: true,
               title: true,
               status: true,
               dateStart: true,
               dateEnd: true,
            }
         })

         const fix = dataProgress.map((v: any) => ({
            ..._.omit(v, ["dateStart", "dateEnd"]),
            dateStart: moment(v.dateStart).format("DD MMMM YYYY"),
            dateEnd: moment(v.dateEnd).format("DD MMMM YYYY"),
         }))

         allData = fix

      } else if (kategori == "file") {
         const dataFile = await prisma.divisionProjectFile.findMany({
            where: {
               isActive: true,
               idProject: String(id)
            },
            select: {
               id: true,
               ContainerFileDivision: {
                  select: {
                     name: true,
                     extension: true
                  }
               }
            }
         })

         const fix = dataFile.map((v: any) => ({
            ..._.omit(v, ["ContainerFileDivision"]),
            name: v.ContainerFileDivision.name,
            extension: v.ContainerFileDivision.extension,
         }))

         allData = fix

      } else if (kategori == "member") {
         const dataMember = await prisma.divisionProjectMember.findMany({
            where: {
               isActive: true,
               idProject: String(id)
            },
            select: {
               id: true,
               User: {
                  select: {
                     name: true,
                     email: true
                  }
               }
            }
         })


         const fix = dataMember.map((v: any) => ({
            ..._.omit(v, ["User"]),
            name: v.User.name,
            email: v.User.email,
         }))

         allData = fix
      }

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan tugas divisi", data: allData }, { status: 200 });

   }
   catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan tugas divisi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}