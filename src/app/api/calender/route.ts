import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";
import "moment/locale/id";
import { createLogUser } from '@/module/user';
import { Frequency, RRule } from 'rrule';

//GET ALL CALENDER
export async function GET(request: Request) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const idDivision = searchParams.get("division");
        const isDate = searchParams.get("date")


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

            const data = await prisma.divisionCalendarReminder.findMany({
                where: {
                    isActive: true,
                    idDivision: idDivision,
                    dateStart: new Date(String(isDate)),
                    DivisionCalendar: {
                        isActive: true
                    }
                },
                select: {
                    id: true,
                    idCalendar: true,
                    timeStart: true,
                    dateStart: true,
                    timeEnd: true,
                    dateEnd: true,
                    createdAt: true,
                    status: true,
                    DivisionCalendar: {
                        select: {
                            title: true,
                            desc: true,
                            User: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                },
                orderBy: [
                    {
                        dateStart: 'asc'
                    },
                    {
                        timeStart: 'asc'
                    },
                    {
                        timeEnd: 'asc'
                    }
                ]
            });

            const allOmit = data.map((v: any) => ({
                ..._.omit(v, ["DivisionCalendar", "User"]),
                title: v.DivisionCalendar.title,
                desc: v.DivisionCalendar.desc,
                user_name: v.DivisionCalendar.User.name,
                timeStart: moment.utc(v.timeStart).format('HH:mm'),
                timeEnd: moment.utc(v.timeEnd).format('HH:mm')
            }))


            return NextResponse.json({ success: true, message: "Berhasil mendapatkan calender", data: allOmit }, { status: 200 });

        } else {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan calender, data tidak ditemukan" }, { status: 404 });
        }

    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Gagal mendapatkan calender, data tidak ditemukan" }, { status: 404 });
    }
}


//CREATE CALENDER
export async function POST(request: Request) {
    try {
        const user = await funGetUserByCookies();
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { idDivision, title, desc, timeStart, timeEnd, dateStart, dateEnd, repeatEventTyper, member, linkMeet, repeatValue } = (await request.json());


        const userId = user.id
        const cekDivision = await prisma.division.count({
            where: {
                id: idDivision,
                isActive: true
            }
        })

        if (cekDivision == 0) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, data tidak ditemukan" }, { status: 404 });
        }

        const y = new Date('1970-01-01 ' + timeStart)
        const x = new Date('1970-01-01 ' + timeEnd)
        const timeStartFix = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString()
        const timeEndFix = new Date(x.getTime() - (x.getTimezoneOffset() * 60000)).toISOString()

        const data = await prisma.divisionCalendar.create({
            data: {
                idDivision,
                createdBy: String(userId),
                title,
                dateStart: new Date(dateStart),
                timeStart: timeStartFix,
                timeEnd: timeEndFix,
                linkMeet,
                repeatEventTyper,
                desc,
                repeatValue: Number(repeatValue)
            },
            select: {
                id: true,
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
            idDivision: idDivision,
            idCalendar: data.id,
            dateStart: recurrenceDate,
            timeStart: timeStartFix,
            timeEnd: timeEndFix,
            dateEnd: recurrenceDate
        }));

        const insertReminder = await prisma.divisionCalendarReminder.createMany({
            data: hasil
        })

        const omitMember = member.map((v: any) => ({
            ..._.omit(v, ["name", "idUser", "img"]),
            idCalendar: data.id,
            idUser: v.idUser
        }))

        const insertMember = await prisma.divisionCalendarMember.createMany({
            data: omitMember
        });


        // create log user
        const log = await createLogUser({ act: 'CREATE', desc: 'User membuat data acara kalender', table: 'divisionCalendar', data: data.id })

        return NextResponse.json({ success: true, message: "Berhasil membuat acara kalender" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal membuat acara kalender, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}