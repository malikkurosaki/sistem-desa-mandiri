import { DIR, funUploadFile, prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
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
      const page = searchParams.get('page');
      const dataSkip = Number(page) * 10 - 10;

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
         skip: dataSkip,
         take: 10,
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
         },
         orderBy: {
            createdAt: "desc"
         }
      });

      const formatData = data.map((v: any) => ({
         ..._.omit(v, ["DivisionProjectTask", "DivisionProjectMember"]),
         progress: ceil((v.DivisionProjectTask.filter((i: any) => i.status == 1).length * 100) / v.DivisionProjectTask.length),
         member: v.DivisionProjectMember.length
      }))

      const totalData = await prisma.divisionProject.count({
         where: {
            isActive: true,
            idDivision: String(divisi),
            status: (status == "0" || status == "1" || status == "2" || status == "3") ? Number(status) : 0,
            title: {
               contains: (name == undefined || name == "null") ? "" : name,
               mode: "insensitive"
            }
         }
      })

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan divisi", data: formatData, total: totalData }, { status: 200 });

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}


// CREATE PROJECT TASK DIVISION
export async function POST(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }


      const body = await request.formData()
      const dataBody = body.get("data")
      const cekFile = body.has("file0")
      const userId = user.id
      const userRoleLogin = user.idUserRole

      const { title, task, member, idDivision } = JSON.parse(dataBody as string)

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
            ..._.omit(v, ["idUser", "name", "img"]),
            idDivision: idDivision,
            idProject: data.id,
            idUser: v.idUser,
         }))

         const insertMember = await prisma.divisionProjectMember.createMany({
            data: dataMember
         })
      }



      let fileFix: any[] = []

      if (cekFile) {
         for (var pair of body.entries()) {
            if (String(pair[0]).substring(0, 4) == "file") {
               const file = body.get(pair[0]) as File
               const fExt = file.name.split(".").pop()
               const fName = file.name.replace("." + fExt, "")

               const upload = await funUploadFile({ file: file, dirId: DIR.task })
               if (upload.success) {
                  const insertToContainer = await prisma.containerFileDivision.create({
                     data: {
                        idDivision: idDivision,
                        name: fName,
                        extension: String(fExt),
                        idStorage: upload.data.id
                     },
                     select: {
                        id: true
                     }
                  })

                  const dataFile = {
                     idProject: data.id,
                     idDivision: idDivision,
                     idFile: insertToContainer.id,
                     createdBy: user.id,
                  }

                  fileFix.push(dataFile)
               }
            }
         }

         const insertFile = await prisma.divisionProjectFile.createMany({
            data: fileFix
         })
      }

      const memberDivision = await prisma.divisionMember.findMany({
         where: {
            idDivision: idDivision
         },
         select: {
            User: {
               select: {
                  id: true
               }
            }
         }
      })


      const dataNotif = memberDivision.map((v: any) => ({
         ..._.omit(v, ["User"]),
         idUserTo: v.User.id,
         idUserFrom: String(user.id),
         category: 'division/' + idDivision + '/task',
         idContent: data.id,
         title: 'Tugas Baru',
         desc: 'Terdapat tugas baru. Silahkan periksa detailnya.'
      }))

      if (userRoleLogin != "supadmin") {
         const perbekel = await prisma.user.findFirst({
            where: {
               isActive: true,
               idUserRole: "supadmin",
               idVillage: user.idVillage
            }
         })

         dataNotif.push({
            idUserTo: perbekel?.id,
            idUserFrom: userId,
            category: 'division/' + idDivision + '/task',
            idContent: data.id,
            title: 'Tugas Baru',
            desc: 'Terdapat tugas baru. Silahkan periksa detailnya.'
         })
      }

      const insertNotif = await prisma.notifications.createMany({
         data: dataNotif
      })


      // create log user
      const log = await createLogUser({ act: 'CREATE', desc: 'User membuat tugas divisi baru', table: 'divisionProject', data: data.id })


      return NextResponse.json({ success: true, message: "Berhasil membuat tugas divisi", notif: dataNotif }, { status: 200 });

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal membuat tugas divisi, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}