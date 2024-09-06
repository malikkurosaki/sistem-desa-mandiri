import moment from "moment";
import { NextResponse } from "next/server";
import "moment/locale/id";
import { funGetUserByCookies } from "@/module/auth";
import { prisma } from "@/module/_global";
import _ from "lodash";

// GET HSITORY 
export async function GET(request: Request) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const idDivision = searchParams.get("division");
        const name = searchParams.get('search');

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
                    title: {
                        contains: (name == undefined || name == "null") ? "" : name,
                        mode: "insensitive"
                    }
                },
                select: {
                    id: true,
                    title: true,
                    timeStart: true,
                    dateStart: true,
                    timeEnd: true,
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
                ..._.omit(v, [""]),
                dateStart: v.dateStart,
            }))

            // groupBy untuk dateStart
            const groupByDateStart = _.groupBy(allOmit, 'dateStart');

            const result = Object.keys(groupByDateStart).map(key => {
                const obj = groupByDateStart[key];
                const data = obj.map((v: any) => ({
                    id: v.id,
                    title: v.title,
                    timeEnd: moment.utc(v.timeEnd).format('HH:mm'),
                    timeStart: moment.utc(v.timeStart).format('HH:mm')
                }))
                return {
                    dateStart: key,
                    data: data
                }
            })

            return NextResponse.json({ success: true, message: "Berhasil mendapatkan calender", data: result }, { status: 200 });

        } else {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan calender, data tidak ditemukan" }, { status: 404 });

        }

    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Gagal mendapatkan calender, data tidak ditemukan" }, { status: 404 });
    }
}