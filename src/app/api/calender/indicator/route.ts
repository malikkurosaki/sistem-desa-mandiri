import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const idDivision = searchParams.get("division");
        const date = searchParams.get("date");

        const awalDate = moment(date).format('YYYY-MM') + '-01'
        const akhirDate = moment(awalDate).add(1, 'M').format('YYYY-MM-DD')


        const cekDivision = await prisma.division.count({
            where: {
                id: String(idDivision),
                isActive: true
            }
        })

        if (cekDivision == 0) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, data tidak ditemukan" }, { status: 404 });
        }

        const data = await prisma.divisionCalendar.findMany({
            where: {
                isActive: true,
                idDivision: String(idDivision),
                dateStart: {
                    gte: new Date(awalDate),
                    lte: new Date(akhirDate),
                }
            }
        })

        const dataGroup = _.map(_.groupBy(data, "dateStart"), (v: any) => ({
            dateContent: v[0].dateStart
        }))

        const result = dataGroup.map(a => moment(a.dateContent).format('YYYY-MM-DD'));


        return NextResponse.json({ success: true, message: "Berhasil mendapatkan list acara", data: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Gagal mendapatkan list acara" }, { status: 401 });
    }
}








