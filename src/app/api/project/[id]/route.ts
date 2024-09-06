import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";


// GET DETAIL PROJECT / GET ONE PROJECT
export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        let allData
        const { id } = context.params;
        const user = await funGetUserByCookies()
        const { searchParams } = new URL(request.url);
        const kategori = searchParams.get("cat");

        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const data = await prisma.project.findUnique({
            where: {
                id: String(id),
                isActive: true
            }
        });

        if (!data) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan project, data tidak ditemukan", }, { status: 404 });
        }


        if (kategori == "data") {
            allData = data
        } else if (kategori == "progress") {
            const dataProgress = await prisma.projectTask.findMany({
                where: {
                    isActive: true,
                    idProject: String(id)
                },
                orderBy: {
                    updatedAt: 'desc'
                }
            })

            const semua = dataProgress.length
            const selesai = _.filter(dataProgress, { status: 1 }).length
            const progress = Math.ceil((selesai / semua) * 100)

            allData = {
                progress: progress,
                lastUpdate: moment(dataProgress[0].updatedAt).format("DD MMMM YYYY"),
            }
        } else if (kategori == "task") {
            const dataProgress = await prisma.projectTask.findMany({
                where: {
                    isActive: true,
                    idProject: String(id)
                },
                select: {
                    id: true,
                    title: true,
                    desc: true,
                    status: true,
                    dateStart: true,
                    dateEnd: true,
                },
                orderBy: {
                    status: 'desc'
                }
            })

            const formatData = dataProgress.map((v: any) => ({
                ..._.omit(v, ["dateStart", "dateEnd"]),
                dateStart: moment(v.dateStart).format("DD MMMM YYYY"),
                dateEnd: moment(v.dateEnd).format("DD MMMM YYYY"),
            }))

            allData = formatData

        } else if (kategori == "file") {
            const dataFile = await prisma.projectFile.findMany({
                where: {
                    isActive: true,
                    idProject: String(id)
                },
                orderBy: {
                    createdAt: 'desc'
                },
                select: {
                    id: true,
                    name: true,
                    extension: true
                }
            })

            allData = dataFile
        } else if (kategori == "member") {

            const dataMember = await prisma.projectMember.findMany({
                where: {
                    isActive: true,
                    idProject: String(id)
                },
                select: {
                    id: true,
                    idUser: true,
                    User: {
                        select: {
                            name: true,
                            email: true,
                            img: true,
                            Position: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                }
            })

            const fix = dataMember.map((v: any) => ({
                ..._.omit(v, ["User"]),
                name: v.User.name,
                email: v.User.email,
                img: v.User.img,
                position: v.User.Position.name
            }))

            allData = fix
        }

        return NextResponse.json({ success: true, message: "Berhasil mendapatkan project", data: allData, }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan project, coba lagi nantiiiiii", reason: (error as Error).message, }, { status: 500 });
    }
}

//CREATE NEW DETAIL TASK PROJECT
export async function POST(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { id } = context.params
        const { name, dateStart, dateEnd, } = await request.json()

        const data = await prisma.project.count({
            where: {
                id: String(id)
            }
        })

        if (data == 0) {
            return NextResponse.json(
                {
                    success: false, message: "Gagal mendapatkan kegiatan, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        const dataCreate = await prisma.projectTask.create({
            data: {
                title: name,
                idProject: id,
                dateStart: new Date(moment(dateStart).format('YYYY-MM-DD')),
                dateEnd: new Date(moment(dateEnd).format('YYYY-MM-DD')),
            },
            select: {
                id: true
            }
        })

        // create log user
        const log = await createLogUser({ act: 'CREATE', desc: 'User membuat data tahapan kegiatan', table: 'projectTask', data: String(dataCreate.id) })

        return NextResponse.json({ success: true, message: "Detail tahapan kegiatan berhasil ditambahkan", data: dataCreate, }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal tambah tahapan kegiatan, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}


// PEMBATALAN TASK PROJECT
export async function DELETE(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { id } = context.params
        const { reason } = await request.json()
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

        const dataCreate = await prisma.project.update({
            where: {
                id
            },
            data: {
                status: 3,
                reason: reason
            }
        })

        // create log user
        const log = await createLogUser({ act: 'UPDATE', desc: 'User membatalkan data kegiatan', table: 'project', data: String(id) })
        return NextResponse.json({ success: true, message: "Kegiatan berhasil dibatalkan" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal membatalkan kegiatan, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}

// EDIT PROJECT
export async function PUT(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { id } = context.params
        const { name } = await request.json()

        const data = await prisma.project.count({
            where: {
                id: id
            }
        })

        if (data == 0) {
            return NextResponse.json(
                {
                    success: false, message: "Gagal mendapatkan kegiatan, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        const dataCreate = await prisma.project.update({
            where: {
                id
            },
            data: {
                title: name
            }
        })

        // create log user
        const log = await createLogUser({ act: 'UPDATE', desc: 'User mengupdate data kegiatan', table: 'project', data: String(id) })

        return NextResponse.json({ success: true, message: "Kegiatan berhasil diupdate" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mengupdate kegiatan, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}