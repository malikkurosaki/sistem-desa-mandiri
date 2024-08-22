import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import { NextResponse } from "next/server";


// ADD MEMBER PROJECT
export async function POST(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { id } = context.params
        const { member } = (await request.json())

        const data = await prisma.project.count({
            where: {
                id: id
            }
        })

        if (data == 0) {
            return NextResponse.json(
                {
                    success: false, message: "Gagal mendapatkan project, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        if (member.length > 0) {
            const dataMember = member.map((v: any) => ({
                ..._.omit(v, ["idUser", "name"]),
                idProject: id,
                idUser: v.idUser
            }))

            const insertMember = await prisma.projectMember.createMany({
                data: dataMember
            })
        }

        return NextResponse.json({ success: true, message: "Berhasil menambahkan anggota project" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal menambah anggota project, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}

// MENGELUARKAN ANGGOTA
export async function DELETE(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { id } = context.params
        const { idUser } = (await request.json());

        const data = await prisma.project.count({
            where: {
                id: id,
            },
        });


        if (data == 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Gagal, data tugas tidak ditemukan",
                },
                { status: 404 }
            );
        }

        const deleteMember = await prisma.projectMember.deleteMany({
            where: {
                idProject: id,
                idUser: idUser
            }
        })

        return NextResponse.json({ success: true, message: "Berhasil mengeluarkan anggota project" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mengeluarkan anggota project, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}

//GET MEMBER ALL USER ID GROUP
export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { id } = context.params
        const groupId = user.idGroup
        const userId = user.id

        const data = await prisma.project.findUnique({
            where: {
                id: String(id),
                isActive: true
            }
        })

        if (data == null) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Gagal, data tugas tidak ditemukan",
                },
                { status: 404 }
            );
        }


        // const member = await prisma.projectMember.findMany({
        //     where: {
        //         idProject: String(id),
        //         isActive: true
        //     },
        //     select: {
        //         id: true,
        //         isLeader: true,
        //         idUser: true,
        //         User: {
        //             select: {
        //                 name: true
        //             }
        //         }
        //     },
        //     orderBy: {
        //         isLeader: 'desc',
        //     }
        // })

        // const fixMember = member.map((v: any) => ({
        //     ..._.omit(v, ["User"]),
        //     name: v.User.name
        // }))

        const member = await prisma.user.findMany({
            where: {
                idGroup: String(groupId),
                id: {
                    not: String(userId)
                },
                isActive: true
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        const fixMember = member.map((v: any) => ({
            idUser: v.id,
            name: v.name,
            email: v.email,

        }))

        const dataFix = {
            project: data,
            member: fixMember
        }

        return NextResponse.json({ success: true, message: "Berhasil mendapatkan project", data: dataFix, }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan project, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}