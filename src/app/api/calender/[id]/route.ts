
import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _, { result } from "lodash";
import { NextResponse } from "next/server";

// GET ONE CALENDER
export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { id } = context.params

        const cek = await prisma.divisionCalendar.count({
            where: {
                id: id
            }
        })

        if (cek == 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Gagal mendapatkan calender, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        const data = await prisma.divisionCalendar.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                desc: true,
                timeStart: true,
                dateStart: true,
                timeEnd: true,
                createdAt: true,
                linkMeet: true,
                repeatEventTyper: true,
            }
        });


        const member = await prisma.divisionCalendarMember.findMany({
            where: {
                idCalendar: id
            },
            select: {
                id: true,
                idUser: true,
                User: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        })
        const fixMember = member.map((v: any) => ({
            ..._.omit(v, ["User"]),

            name: v.User.name,
            email: v.User.email,
            
        }))


        const dataFix = {
            calender: data,
            member: fixMember,
            total: fixMember.length
        }


        return NextResponse.json({ success: true, message: "Berhasil mendapatkan calender", data: dataFix }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Gagal mendapatkan calender, data tidak ditemukan",
            },
            { status: 404 }
        );
    }
}

