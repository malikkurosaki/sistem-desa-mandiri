import { DIR, funUploadFile, prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import _ from "lodash";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// GET ALL MEMBER / USER
export async function GET(request: Request) {
  try {
    let fixGroup
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('search')
    const idGroup = searchParams.get("group");
    const active = searchParams.get("active");
    const page = searchParams.get('page');
    const dataSkip = Number(page) * 10 - 10;
    const user = await funGetUserByCookies()
    if (user.id == undefined) {
      return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
    }

    if (idGroup == "null" || idGroup == undefined || idGroup == "") {
      fixGroup = user.idGroup
    } else {
      fixGroup = idGroup
    }

    const filter = await prisma.group.findUnique({
      where: {
        id: fixGroup
      },
      select: {
        id: true,
        name: true
      }
    })


    if (page != undefined) {
      const users = await prisma.user.findMany({
        skip: dataSkip,
        take: 10,
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
          img: true,
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
        orderBy: {
          name: 'asc'
        }
      });

      const allData = users.map((v: any) => ({
        ..._.omit(v, ["Group", "Position"]),
        group: v.Group.name,
        position: v.Position.name
      }))

      return NextResponse.json({ success: true, message: "Berhasil member", data: allData, filter }, { status: 200 });
    } else {
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
          img: true,
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
        orderBy: {
          name: 'asc'
        }
      });

      const allData = users.map((v: any) => ({
        ..._.omit(v, ["Group", "Position"]),
        group: v.Group.name,
        position: v.Position.name
      }))

      return NextResponse.json({ success: true, message: "Berhasil member", data: allData, filter }, { status: 200 });
    }


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
    const body = await request.formData()
    const data = JSON.parse(body.get("data") as string)
    const file = body.get("file") as File
    const village = String(user.idVillage)

    let groupFix = data.idGroup

    if (groupFix == null || groupFix == undefined || groupFix == "") {
      groupFix = user.idGroup
    }

    const cekNIK = await prisma.user.count({
      where: {
        nik: data.nik
      },
    });

    const cekEmail = await prisma.user.count({
      where: {
        email: data.email
      },
    });

    const cekPhone = await prisma.user.count({
      where: {
        phone: "62" + data.phone
      },
    });


    if (cekNIK == 0 && cekEmail == 0 && cekPhone == 0) {
      const users = await prisma.user.create({
        data: {
          nik: data.nik,
          name: data.name,
          phone: "62" + data.phone,
          email: data.email,
          gender: data.gender,
          idGroup: groupFix,
          idVillage: village,
          idPosition: data.idPosition,
          idUserRole: data.idUserRole,
        },
        select: {
          id: true,
          idGroup: true,
        },
      });

      if (String(file) != "undefined" && String(file) != "null") {

        const fExt = file.name.split(".").pop()
        const fileName = user.id + '.' + fExt;
        const newFile = new File([file], fileName, { type: file.type });
        const upload = await funUploadFile({ file: newFile, dirId: DIR.user })
        if (upload.success) {
          await prisma.user.update({
            where: {
              id: users.id
            },
            data: {
              img: upload.data.id
            }
          })
        }
      }

      // create log user
      const log = await createLogUser({ act: 'CREATE', desc: 'User membuat data user baru', table: 'user', data: users.id })

      return Response.json({ success: true, message: 'Sukses membuat user', data: users}, { status: 200 });
    } else {
      return Response.json({ success: false, message: "User sudah ada" }, { status: 400 });
    }

  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}