import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import _ from "lodash";
import { NextResponse } from "next/server";

// GET ALL MEMBER / USER
export async function GET(request: Request) {
    try {
        let fixGroup
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('search')
        const idGroup = searchParams.get("group");
        const active = searchParams.get("active");
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        if (idGroup == "null" || idGroup == undefined) {
            fixGroup = user.idGroup
          } else {
            fixGroup = idGroup
          }


        const users = await prisma.user.findMany({
            where: {
                isActive: active == 'false' ? false : true,
                idGroup: String(fixGroup),
                name: {
                    contains: (name == undefined || name == null) ? "" : name,
                    mode: "insensitive",
                }
            },
            select: {
                id: true,
                isActive: true,
                nik: true,
                name: true,
                phone: true,
                email: true,
                gender: true,
                Position: {
                    select: {
                        name: true,
                    },
                },
                Group: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        const allData = users.map((v: any) => ({
            ..._.omit(v, ["Group", "Position" ]),
          group: v.Group.name,
          position: v.Position.name
        }))

        return NextResponse.json({ success: true, message: "Berhasil member", data: allData, }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan member, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}


// CREATE MEMBER / USER
export async function POST(request: Request) {
    try {

        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const data = await request.json();
        const village = "desa1"
    
        const cek = await prisma.user.count({
          where: {
            nik: data.nik,
            email: data.email,
            phone: data.phone
          },
        });
    
        if (cek == 0) {
          const users = await prisma.user.create({
            data: {
              nik: data.nik,
              name: data.name,
              phone: data.phone,
              email: data.email,
              gender: data.gender,
              idGroup: data.idGroup,
              idVillage: village,
              idPosition: data.idPosition,
              idUserRole: data.idUserRole,
            },
            select: {
              id: true,
              nik: true,
              name: true,
              phone: true,
              email: true,
              gender: true,
            },
          });
    
          // create log user
          const log = await createLogUser({ act: 'CREATE', desc: 'User membuat data user baru', table: 'user', data: users.id })
    
          return Response.json({ success: true, message: 'Sukses membuat user' }, { status: 200 });
        } else {
          return Response.json({ success: false, message: "User sudah ada" }, { status: 400 });
        }
    
    
    
      } catch (error) {
        console.error(error);
        return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
      }
}