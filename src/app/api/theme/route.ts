import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import _ from "lodash";
import { NextResponse } from "next/server";

// GET ALL THEME
export async function GET(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }


      const data = await prisma.colorTheme.findMany({
         where: {
            OR: [
               {
                  isActive: true,
                  idVillage: null
               },
               {
                  isActive: true,
                  idVillage: user.idVillage
               },
            ]
         },
         orderBy: {
            createdAt: 'asc'
         }
      })

      const desa = await prisma.village.findUnique({
         where: {
            id: user.idVillage
         }
      })

      const result = data.map((v: any) => ({
         ..._.omit(v, ["isUse"]),
         isUse: (v.id == desa?.idTheme)
      }))

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan tema", data: result }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan tema, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}


// CREATE THEME
export async function POST(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { name, utama, bgUtama, bgIcon, bgFiturHome, bgFiturDivision, bgTotalKegiatan } = (await request.json());
      const idVillage = user.idVillage
      const data = await prisma.colorTheme.create({
         data: {
            name,
            idVillage,
            utama,
            bgUtama,
            bgIcon,
            bgFiturHome,
            bgFiturDivision,
            bgTotalKegiatan
         },
         select: {
            id: true
         }
      });

      // create log user
      const log = await createLogUser({ act: 'CREATE', desc: 'User membuat tema baru', table: 'colorTheme', data: data.id })


      return NextResponse.json({ success: true, message: "Berhasil menambahkan tema" }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal menambahkan tema, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
};