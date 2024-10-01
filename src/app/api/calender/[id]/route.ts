import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import _, { remove } from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";
import { Frequency, RRule } from 'rrule';

// GET ONE CALENDER BY ID KALENDER REMINDER
export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { id } = context.params

        const cek = await prisma.divisionCalendarReminder.count({
            where: {
                id: id
            }
        })

        if (cek == 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Gagal mendapatkan acara, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        const data: any = await prisma.divisionCalendarReminder.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                timeStart: true,
                dateStart: true,
                timeEnd: true,
                createdAt: true,
                DivisionCalendar: {
                    select: {
                        id: true,
                        title: true,
                        desc: true,
                        linkMeet: true,
                        repeatEventTyper: true,
                        repeatValue: true,
                    }
                }
            }
        });
        const { DivisionCalendar, ...dataCalender } = data
        const timeStart = moment.utc(dataCalender?.timeStart).format("HH:mm")
        const timeEnd = moment.utc(dataCalender?.timeEnd).format("HH:mm")
        const idCalendar = data?.DivisionCalendar.id
        const title = data?.DivisionCalendar?.title
        const desc = data?.DivisionCalendar?.desc
        const linkMeet = data?.DivisionCalendar?.linkMeet
        const repeatEventTyper = data?.DivisionCalendar?.repeatEventTyper
        const repeatValue = data?.DivisionCalendar?.repeatValue


        const result = { ...dataCalender, timeStart, timeEnd, idCalendar, title, desc, linkMeet, repeatEventTyper, repeatValue }


        const member = await prisma.divisionCalendarMember.findMany({
            where: {
                idCalendar: data?.DivisionCalendar.id
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
                    message: "Gagal menghapus acara kalender, data tidak ditemukan",
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

        return NextResponse.json({ success: true, message: "Berhasil menghapus acara kalender", data }, { status: 200 });

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

// EDIT CALENDER BY IDKALENDER
export async function PUT(request: Request, context: { params: { id: string } }) {
    try {

        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { id } = context.params
        const userId = user.id
        const { title, desc, timeStart, dateStart, timeEnd, linkMeet, repeatEventTyper, repeatValue } = await request.json()

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
                status: statusCalender,
                repeatValue: Number(repeatValue)
            },
            select: {
                idDivision: true
            }
        });

        const freq: Frequency = repeatEventTyper === "yearly" ? RRule.YEARLY :
            repeatEventTyper === "monthly" ? RRule.MONTHLY :
                repeatEventTyper === "weekly" ? RRule.WEEKLY :
                    repeatEventTyper === "daily" ? RRule.DAILY :
                        repeatEventTyper === "hourly" ? RRule.HOURLY :
                            repeatEventTyper === "minutely" ? RRule.MINUTELY :
                                RRule.SECONDLY;

        const rule = new RRule({
            freq,
            interval: 1,
            dtstart: new Date(dateStart),
            count: repeatValue
        });

        const hasil = rule.all().map(recurrenceDate => ({
            idDivision: data.idDivision,
            idCalendar: id,
            dateStart: recurrenceDate,
            timeStart: timeStartFix,
            timeEnd: timeEndFix,
            dateEnd: recurrenceDate
        }));

        const deleteReminder = await prisma.divisionCalendarReminder.deleteMany({
            where: {
                idCalendar: id
            }
        })

        const insertReminder = await prisma.divisionCalendarReminder.createMany({
            data: hasil
        })


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