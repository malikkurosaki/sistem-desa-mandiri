import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import { NextResponse } from "next/server";

// ADD MEMBER TASK DIVISI
export async function POST(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { id } = context.params;
      const { member, idDivision } = (await request.json());

      const data = await prisma.divisionProject.count({
         where: {
            id: id,
         },
      });

      if (data == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Tambah anggota tugas gagal, data tugas tidak ditemukan",
            },
            { status: 404 }
         );
      }

      if (member.length > 0) {
         const dataMember = member.map((v: any) => ({
            ..._.omit(v, ["idUser", "name"]),
            idDivision: idDivision,
            idProject: id,
            idUser: v.idUser,
         }))

         const insertMember = await prisma.divisionProjectMember.createMany({
            data: dataMember
         })
      }


      return NextResponse.json(
         {
            success: true,
            message: "Berhasil menambahkan anggota tugas",
         },
         { status: 200 }
      );
   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal menambah anggota tugas, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
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

      const data = await prisma.divisionProject.count({
         where: {
            id: id,
         },
      });


      if (data == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Gagal, data tugas tidak ditemukan",
            },
            { status: 404 }
         );
      }

      console.log(id, idUser)


      const del = await prisma.divisionProjectMember.deleteMany({
         where: {
            idUser: idUser,
            idProject: id
         }
      })


      return NextResponse.json(
         {
            success: true,
            message: "Berhasil mengeluarkan anggota",
         },
         { status: 200 }
      );
   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal mengeluarkan anggota, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}