import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import { NextResponse } from "next/server";



// GET ALL DATA PROJECT
export async function GET(request: Request) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);

        const name = searchParams.get('search');
        const status = searchParams.get('status');
        const villageId = user.idVillage
        const groupId = user.idGroup
        const userId = user.id


        const data = await prisma.project.findMany({
            where: {
                isActive: true,
                idVillage: String(villageId),
                idGroup: String(groupId),
                createdBy: String(userId),
                name: {
                    contains: (name == undefined || name == "null") ? "" : name,
                    mode: "insensitive"
                },
                status: (status == "0" || status == "1" || status == "2" || status == "3") ? Number(status) : 0
            },
            select: {
                id: true,
                name: true,
                desc: true,
                status: true,
                ProjectMember: {
                    where: {
                        isActive: true
                    },
                    select: {
                        idUser: true
                    }
                }
            }
        })

        const omitData = data.map((v: any) => ({
            ..._.omit(v, ["ProjectMember"]),
            member: v.ProjectMember.length
        }))


        return NextResponse.json({ success: true, message: "Berhasil mendapatkan project", data: omitData, }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan project, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}