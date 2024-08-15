import { User } from './../../../module/discussion/lib/type_discussion';
import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";

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
                    dateStart: true,
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
                user_name: v.User.name
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
