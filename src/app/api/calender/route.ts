import { User } from './../../../module/discussion/lib/type_discussion';
import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";
import "moment/locale/id";

//GET ALL CALENDER
export async function GET(request: Request) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const idDivision = searchParams.get("division");

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

            const data = await prisma.divisionCalendar.findMany({
                where: {
                    isActive: true,
                    idDivision: idDivision,
                },
                select: {
                    id: true,
                    title: true,
                    desc: true,
                    status: true,
                    timeStart: true,
                    dateStart: true,
                    timeEnd: true,
                    dateEnd: true,
                    createdAt: true,
                    User: {
                        select: {
                            name: true
                        }
                    }
                }
            });

            const allOmit = data.map((v: any) => ({
                ..._.omit(v, ["User"]),
                user_name: v.User.name,
                timeStart: moment(v.timeStart).format('LT'),
                timeEnd: moment(v.timeEnd).format('LT')
            }))


            return NextResponse.json({ success: true, message: "Berhasil mendapatkan calender", data: allOmit }, { status: 200 });

        } else {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan calender, data tidak ditemukan" }, { status: 404 });
        }

    } catch (error) {
        console.log(error)
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

        const { idDivision, title, desc, timeStart, timeEnd, dateStart, dateEnd, repeatEventTyper, member, linkMeet } = (await request.json());


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

        if (timeStart > timeEnd) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan calender, waktu mulai harus lebih kecil dari waktu berakhir" }, { status: 404 });
        }

        if (dateStart > dateEnd) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan calender, Tanggal mulai harus lebih kecil dari Tanggal berakhir" }, { status: 404 });
        }

        if (dateStart < moment().format("YYYY-MM-DD")) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan calender, Tanggal mulai harus lebih kecil dari Tanggal sekarang" }, { status: 404 });
        }

        if (dateEnd < moment().format("YYYY-MM-DD")) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan calender, Tanggal berakhir harus lebih kecil dari Tanggal sekarang" }, { status: 404 });
        }

        const statusCalender = 0

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
                status: statusCalender
            },
            select: {
                id: true,

            }
        });

        const omitMember = member.map((v: any) => ({
            ..._.omit(v, ["name", "idUser"]),
            idCalendar: data.id,
            idUser: v.idUser
        }))

        const insertMember = await prisma.divisionCalendarMember.createMany({
            data: omitMember
        });



        return NextResponse.json({ success: true, message: "Berhasil mendapatkan calender" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan calender, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}