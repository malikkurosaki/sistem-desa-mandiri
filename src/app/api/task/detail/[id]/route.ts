import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import _ from "lodash";
import { NextResponse } from "next/server";


// HAPUS DETAIL TASK
export async function DELETE(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }
      const { id } = context.params;
      const { idProject } = (await request.json());
      const data = await prisma.divisionProjectTask.count({
         where: {
            id: id,
         },
      });

      if (data == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Hapus tugas gagal, data tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const update = await prisma.divisionProjectTask.update({
         where: {
            id: id,
         },
         data: {
            isActive: false,
         },
      });

      // const cek progress 
      const dataTask = await prisma.divisionProjectTask.findMany({
         where: {
            isActive: true,
            idProject: idProject
         }
      })

      const semua = dataTask.length
      const selesai = _.filter(dataTask, { status: 1 }).length
      const progress = Math.ceil((selesai / semua) * 100)
      let statusProject = 1

      if (progress == 100) {
         statusProject = 2
      } else if (progress == 0) {
         statusProject = 0
      }

      const updProject = await prisma.divisionProject.update({
         where: {
            id: idProject
         },
         data: {
            status: statusProject
         }
      })

      // create log user
      const log = await createLogUser({ act: 'DELETE', desc: 'User menghapus detail task divisi', table: 'divisionProjectTask', data: id })

      return NextResponse.json({ success: true, message: "Tugas berhasil dihapus", data, }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal menghapus tugas divisi, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}

// EDIT STATUS DETAIL TASK
export async function PUT(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { id } = context.params;
      const { status, idProject } = (await request.json());
      const data = await prisma.divisionProjectTask.count({
         where: {
            id: id,
         },
      });

      if (data == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Update status detail tugas gagal, data tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const update = await prisma.divisionProjectTask.update({
         where: {
            id: id,
         },
         data: {
            status: status,
         },
      });

      // const cek progress 
      const dataTask = await prisma.divisionProjectTask.findMany({
         where: {
            isActive: true,
            idProject: idProject
         }
      })

      const semua = dataTask.length
      const selesai = _.filter(dataTask, { status: 1 }).length
      const progress = Math.ceil((selesai / semua) * 100)
      let statusProject = 1

      if (progress == 100) {
         statusProject = 2
      } else if (progress == 0) {
         statusProject = 0
      }

      const updProject = await prisma.divisionProject.update({
         where: {
            id: idProject
         },
         data: {
            status: statusProject
         }
      })

      // create log user
      const log = await createLogUser({ act: 'UPDATE', desc: 'User mengupdate status detail task divisi', table: 'divisionProjectTask', data: id })

      return NextResponse.json({ success: true, message: "Status detail tugas berhasil diupdate", data, }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mengupdate status detail tugas, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}


// GET ONE DETAIL TASK 
export async function GET(request: Request, context: { params: { id: string } }) {
   try {
      const { id } = context.params;
      const user = await funGetUserByCookies()

      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const data = await prisma.divisionProjectTask.findUnique({
         where: {
            id: String(id),
            isActive: true
         }
      });

      if (!data) {
         return NextResponse.json({ success: false, message: "Gagal mendapatkan detail tugas, data tidak ditemukan", }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan detail tugas divisi", data }, { status: 200 });

   }
   catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan detail tugas divisi, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}



// EDIT DETAIL TASK
export async function POST(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { id } = context.params;
      const { title, dateStart, dateEnd } = (await request.json());
      const data = await prisma.divisionProjectTask.count({
         where: {
            id: id,
         },
      });

      if (data == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Edit detail tugas gagal, data tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const update = await prisma.divisionProjectTask.update({
         where: {
            id: id,
         },
         data: {
            title,
            dateStart: new Date(dateStart),
            dateEnd: new Date(dateEnd),
         },
      });

      // create log user
      const log = await createLogUser({ act: 'UPDATE', desc: 'User mengupdate data detail task divisi', table: 'divisionProjectTask', data: id })

      return NextResponse.json({ success: true, message: "Detail tugas berhasil diedit", data, }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mengedit detail tugas, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}