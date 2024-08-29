import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _, { ceil } from "lodash";
import moment from "moment";
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
                  title: true,
                  status: true
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
         progress: ceil((v.DivisionProjectTask.filter((i: any) => i.status == 1).length*100) / v.DivisionProjectTask.length),
         member: v.DivisionProjectMember.length
      }))

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan divisi", data: formatData, }, { status: 200 });

   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}


// CREATE PROJECT TASK DIVISION
export async function POST(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { title, task, member, file, idDivision } = (await request.json());

      const cek = await prisma.division.count({
         where: {
            isActive: true,
            id: idDivision
         }
      })

      if (cek == 0) {
         return NextResponse.json({ success: false, message: "Gagal, data divisi tidak ditemukan", }, { status: 404 });
      }

      const data = await prisma.divisionProject.create({
         data: {
            idDivision: idDivision,
            title: title,
            desc: ''
         },
         select: {
            id: true
         }
      })


      if (task.length > 0) {
         const dataTask = task.map((v: any) => ({
            ..._.omit(v, ["dateStart", "dateEnd", "title"]),
            idDivision: idDivision,
            idProject: data.id,
            title: v.title,
            dateStart: new Date(moment(v.dateStart).format('YYYY-MM-DD')),
            dateEnd: new Date(moment(v.dateEnd).format('YYYY-MM-DD')),
         }))

         const insertTask = await prisma.divisionProjectTask.createMany({
            data: dataTask
         })
      }

      if (member.length > 0) {
         const dataMember = member.map((v: any) => ({
            ..._.omit(v, ["idUser", "name"]),
            idDivision: idDivision,
            idProject: data.id,
            idUser: v.idUser,
         }))

         const insertMember = await prisma.divisionProjectMember.createMany({
            data: dataMember
         })
      }

      let fileFix: any[] = []


      if (file.length > 0) {
         file.map((v: any, index: any) => {
            const f: any = file[index].get('file')
            const fName = f.name
            const fExt = fName.split(".").pop()

            const dataFile = {
               name: fName,
               extension: fExt,
               idDivision: idDivision,
               idProject: data.id,
            }

            fileFix.push(dataFile)
         })

         const insertFile = await prisma.divisionProjectFile.createMany({
            data: fileFix
         })

      }


      return NextResponse.json({ success: true, message: "Berhasil membuat tugas divisi", }, { status: 200 });

   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal membuat tugas divisi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}