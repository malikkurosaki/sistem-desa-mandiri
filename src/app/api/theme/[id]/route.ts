import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import _ from "lodash";
import { NextResponse } from "next/server";

// GET ONE THEME
export async function GET(request: Request, context: { params: { id: string } }) {
   try {
      const { id } = context.params;
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const data = await prisma.colorTheme.findUnique({
         where: {
            id: String(id),
            isActive: true
         }
      });

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan anggota", data }, { status: 200 });

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan member, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}


// HAPUS THEME
export async function DELETE(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }
      const { id } = context.params;
      const data = await prisma.colorTheme.count({
         where: {
            id: id,
         },
      });

      if (data == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Hapus tema gagal, data tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const update = await prisma.colorTheme.update({
         where: {
            id: id,
         },
         data: {
            isActive: false,
         },
      });

      // create log user
      const log = await createLogUser({ act: 'DELETE', desc: 'User menghapus tema', table: 'colorTheme', data: id })

      return NextResponse.json({ success: true, message: "Tema berhasil dihapus", data, }, { status: 200 });

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal menghapus tema, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}


// EDIT THEME
export async function PUT(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { id } = context.params;
      const { name, utama, bgUtama, bgIcon, bgFiturHome, bgFiturDivision, bgTotalKegiatan } = (await request.json());
      const data = await prisma.colorTheme.count({
         where: {
            id: id,
         },
      });

      if (data == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Edit tema gagal, data tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const update = await prisma.colorTheme.update({
         where: {
            id: id,
         },
         data: {
            name: name,
            utama: utama,
            bgUtama: bgUtama,
            bgIcon: bgIcon,
            bgFiturHome: bgFiturHome,
            bgFiturDivision: bgFiturDivision,
            bgTotalKegiatan: bgTotalKegiatan
         },
      });

      // create log user
      const log = await createLogUser({ act: 'UPDATE', desc: 'User mengedit data tema', table: 'colorTheme', data: id })

      return NextResponse.json({ success: true, message: "Tema berhasil diedit", data, }, { status: 200 });

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mengedit tema, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}



// CHANGE THEME
export async function POST(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }
      const { id } = context.params;
      const data = await prisma.colorTheme.count({
         where: {
            id: id,
            isActive: true
         },
      });

      if (data == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Ganti tema gagal, data tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const update = await prisma.village.update({
         where: {
            id: user.idVillage,
         },
         data: {
            idTheme: id,
         },
      });

      const dataTheme = await prisma.colorTheme.findUnique({
         where: {
            id: id
         }
      })

      // create log user
      const log = await createLogUser({ act: 'DELETE', desc: 'User mengganti tema', table: 'colorTheme', data: id })

      return NextResponse.json({ success: true, message: "Tema berhasil diganti", data: dataTheme }, { status: 200 });

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mengganti tema, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}