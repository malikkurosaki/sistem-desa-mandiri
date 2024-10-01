import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export const revalidate = true
export async function GET(request: Request, context: { params: { id: string } }) {
   try {
      const { id } = context.params;
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const data = await prisma.group.findUnique({
         where: {
            id: id,
         },
      });

      if (!data) {
         return NextResponse.json(
            {
               success: false,
               message: "Gagal mendapatkan grup, data tidak ditemukan",
            },
            { status: 404 }
         );
      }

      return NextResponse.json(
         {
            success: true,
            message: "Berhasil mendapatkan grup",
            data,
         },
         { status: 200 }
      );
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan grup, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }
      const { id } = context.params;
      const { isActive } = (await request.json());
      const data = await prisma.group.count({
         where: {
            id: id,
         },
      });

      if (data == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Edit grup gagal, data tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const update = await prisma.group.update({
         where: {
            id: id,
         },
         data: {
            isActive: !isActive,
         },
      });

      // create log user
      const log = await createLogUser({ act: 'UPDATE', desc: 'User mengedit status data grup', table: 'group', data: id })

      return NextResponse.json( { success: true, message: "Grup berhasil diedit", data, }, { status: 200 } );

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mengedit grup, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}

export async function PUT(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { id } = context.params;
      const { name } = (await request.json());
      const data = await prisma.group.count({
         where: {
            id: id,
         },
      });

      if (data == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Edit grup gagal, data tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const update = await prisma.group.update({
         where: {
            id: id,
         },
         data: {
            name: name,
         },
      });

      // create log user
      const log = await createLogUser({ act: 'UPDATE', desc: 'User mengedit data grup', table: 'group', data: id })

      return NextResponse.json( { success: true, message: "Grup berhasil diedit", data, }, { status: 200 } );

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mengedit grup, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}