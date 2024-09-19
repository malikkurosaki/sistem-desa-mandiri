import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";
import "moment/locale/id";
import { createLogUser } from "@/module/user";


// GET ALL DISCUSSION DIVISION ACTIVE = TRUE
export async function GET(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { searchParams } = new URL(request.url);
      const idDivision = searchParams.get("division");
      const name = searchParams.get('search');
      const page = searchParams.get('page');
      const dataSkip = Number(page) * 10 - 10;


      if (idDivision != "null" && idDivision != null && idDivision != undefined) {
         const cekDivision = await prisma.division.count({
            where: {
               id: idDivision,
               isActive: true
            }
         })

         if (cekDivision == 0) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, data tidak ditemukan" }, { status: 404 });
         }

         const data = await prisma.divisionDisscussion.findMany({
            skip: dataSkip,
            take: 10,
            where: {
               isActive: true,
               idDivision: idDivision,
               User: {
                  name: {
                     contains: (name == undefined || name == "null") ? "" : name,
                     mode: "insensitive"
                  }
               }
            },
            orderBy: {
               createdAt: 'desc'
            },
            select: {
               id: true,
               title: true,
               desc: true,
               status: true,
               createdAt: true,
               User: {
                  select: {
                     name: true,
                     img: true
                  }
               },
               DivisionDisscussionComment: {
                  select: {
                     id: true,
                  }
               }
            }
         });



         const fixData = data.map((v: any) => ({
            ..._.omit(v, ["User", "DivisionDisscussionComment", "createdAt"]),
            user_name: v.User.name,
            img: v.User.img,
            total_komentar: v.DivisionDisscussionComment.length,
            createdAt: moment(v.createdAt).format("ll")
         }))

         return NextResponse.json({ success: true, message: "Berhasil mendapatkan diskusi", data: fixData, }, { status: 200 });

      } else {
         return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, data tidak ditemukan" }, { status: 404 });
      }

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan diskusi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}



// CREATE DISCUSSION
export async function POST(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { idDivision, desc } = (await request.json());

      const cekDivision = await prisma.division.count({
         where: {
            id: idDivision,
            isActive: true
         }
      })

      if (cekDivision == 0) {
         return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, data tidak ditemukan" }, { status: 404 });
      }

      const data = await prisma.divisionDisscussion.create({
         data: {
            idDivision,
            desc,
            createdBy: user.id
         },
         select: {
            id: true
         }
      });

      // create log user
      const log = await createLogUser({ act: 'CREATE', desc: 'User membuat data diskusi', table: 'divisionDisscussion', data: data.id })

      return NextResponse.json({ success: true, message: "Berhasil menambahkan diskusi", data, }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal menambahkan diskusi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
};