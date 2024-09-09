import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import _ from "lodash";
import moment from "moment";
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

        const { ...dataCalender } = data
        const timeStart = moment.utc(dataCalender?.timeStart).format("HH:mm")
        const timeEnd = moment.utc(dataCalender?.timeEnd).format("HH:mm")

        const result = { ...dataCalender, timeStart, timeEnd }


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
                        email: true,
                        img: true
                    }
                }
            }
        })
        const fixMember = member.map((v: any) => ({
            ..._.omit(v, ["User"]),
            name: v.User.name,
            email: v.User.email,
            img: v.User.img
        }))


        const dataFix = {
            calender: result,
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

// DELETE CALENDER BY ID
export async function DELETE(request: Request, context: { params: { id: string } }) {
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
                    message: "Gagal menghapus calender, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        const data = await prisma.divisionCalendar.update({
            where: {
                id: id
            },
            data: {
                isActive: false
            }
        });

        // create log user
        const log = await createLogUser({ act: 'DELETE', desc: 'User menghapus data acara kalender', table: 'divisionCalendar', data: id })

        return NextResponse.json({ success: true, message: "Berhasil menghapus calender", data }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Gagal menghapus calender, coba lagi nanti",
            },
            { status: 500 }
        );
    }
}

// EDIT CALENDER BY ID
export async function PUT(request: Request, context: { params: { id: string } }) {
    try {

        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { id } = context.params
        const userId = user.id
        const { title, desc, timeStart, dateStart, timeEnd, linkMeet, repeatEventTyper } = await request.json()

        const cek = await prisma.divisionCalendar.count({
            where: {
                id: id
            }
        })

        if (cek == 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Gagal mengedit acara, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        const y = new Date('1970-01-01 ' + timeStart)
        const x = new Date('1970-01-01 ' + timeEnd)
        const timeStartFix = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString()
        const timeEndFix = new Date(x.getTime() - (x.getTimezoneOffset() * 60000)).toISOString()
        const statusCalender = 0
        const data = await prisma.divisionCalendar.update({
            where: {
                id: id
            },
            data: {
                title: title,
                desc: desc,
                createdBy: String(userId),
                timeStart: timeStartFix,
                dateStart: new Date(dateStart),
                timeEnd: timeEndFix,
                linkMeet: linkMeet,
                repeatEventTyper: repeatEventTyper,
                status: statusCalender
            }
        });


        // create log user
        const log = await createLogUser({ act: 'UPDATE', desc: 'User mengupdate data acara kalender', table: 'divisionCalendar', data: id })

        return NextResponse.json({ success: true, message: "Berhasil mengedit acara" }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Gagal mengedit acara, coba lagi nanti",
            },
            { status: 500 }
        );
    }
}