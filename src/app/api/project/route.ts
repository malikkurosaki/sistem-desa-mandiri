import { DIR, funUploadFile, prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";
import { createLogUser } from "@/module/user";


// GET ALL DATA PROJECT
export async function GET(request: Request) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const roleUser = user.idUserRole
        const { searchParams } = new URL(request.url);

        let grup
        const name = searchParams.get('search');
        const status = searchParams.get('status');
        const idGroup = searchParams.get("group");
        const page = searchParams.get('page');
        const dataSkip = Number(page) * 10 - 10;
        const villageId = user.idVillage
        const userId = user.id

        if (idGroup == "null" || idGroup == undefined) {
            grup = user.idGroup
        } else {
            grup = idGroup
        }

        const cek = await prisma.group.count({
            where: {
                id: grup,
                isActive: true
            }
        })

        if (cek == 0) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan data kegiatan, data tidak ditemukan", }, { status: 404 });
        }

        let kondisi: any = {
            isActive: true,
            idVillage: String(villageId),
            idGroup: grup,
            title: {
                contains: (name == undefined || name == "null") ? "" : name,
                mode: "insensitive"
            },
            status: (status == "0" || status == "1" || status == "2" || status == "3") ? Number(status) : 0
        }

        if (roleUser != "supadmin" && roleUser != "cosupadmin" && roleUser != "admin") {
            kondisi = {
                isActive: true,
                idVillage: String(villageId),
                idGroup: grup,
                title: {
                    contains: (name == undefined || name == "null") ? "" : name,
                    mode: "insensitive"
                },
                status: (status == "0" || status == "1" || status == "2" || status == "3") ? Number(status) : 0,
                ProjectMember: {
                    some: {
                        idUser: String(userId)
                    }
                }
            }
        }


        const data = await prisma.project.findMany({
            skip: dataSkip,
            take: 10,
            where: kondisi,
            select: {
                id: true,
                title: true,
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
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        const omitData = data.map((v: any) => ({
            ..._.omit(v, ["ProjectMember"]),
            member: v.ProjectMember.length
        }))


        const totalData = await prisma.project.count({
            where: kondisi
        })

        const filter = await prisma.group.findUnique({
            where: {
                id: grup
            },
            select: {
                id: true,
                name: true
            }
        })


        return NextResponse.json({ success: true, message: "Berhasil mendapatkan kegiatan", data: omitData, filter, total: totalData }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan kegiatan, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}

// CREATE PROJECT 
export async function POST(request: Request) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const body = await request.formData()
        const dataBody = body.get("data")
        const cekFile = body.has("file0")

        const { idGroup, title, task, member } = JSON.parse(dataBody as string)
        const userId = user.id
        const userRoleLogin = user.idUserRole

        const data = await prisma.project.create({
            data: {
                idVillage: String(user.idVillage),
                idGroup: String(idGroup),
                title,
                createdBy: String(userId)
            },
            select: {
                id: true
            }
        })

        if (task.length > 0) {
            const dataProject = task.map((v: any) => ({
                ..._.omit(v, ["dateStart", "dateEnd", "name"]),
                idProject: data.id,
                title: v.title,
                dateStart: new Date(moment(v.dateStart).format('YYYY-MM-DD')),
                dateEnd: new Date(moment(v.dateEnd).format('YYYY-MM-DD')),
            }))

            const insertTask = await prisma.projectTask.createMany({
                data: dataProject
            })
        }

        if (member.length > 0) {
            const dataMember = member.map((v: any) => ({
                ..._.omit(v, ["idUser", "name", "img"]),
                idProject: data.id,
                idUser: v.idUser,
            }))

            const insertMember = await prisma.projectMember.createMany({
                data: dataMember
            })
        }

        if (cekFile) {
            for (var pair of body.entries()) {
                if (String(pair[0]).substring(0, 4) == "file") {
                    const file = body.get(pair[0]) as File
                    const fExt = file.name.split(".").pop()
                    const fName = file.name.replace("." + fExt, "")
                    const upload = await funUploadFile({ file: file, dirId: DIR.project })
                    if (upload.success) {
                        await prisma.projectFile.create({
                            data: {
                                idStorage: upload.data.id,
                                idProject: data.id,
                                name: fName,
                                extension: String(fExt)
                            }
                        })
                    }
                }
            }
        }

        const memberNotif = await prisma.projectMember.findMany({
            where: {
                idProject: data.id
            },
            select: {
                idUser: true
            }
        })

        const dataNotif = memberNotif.map((v: any) => ({
            ..._.omit(v, ["idUser"]),
            idUserTo: v.idUser,
            idUserFrom: userId,
            category: 'project',
            idContent: data.id,
            title: 'Kegiatan Baru',
            desc: 'Terdapat kegiatan baru. Silahkan periksa detailnya.'
        }))

        if (userRoleLogin != "supadmin") {
            const perbekel = await prisma.user.findFirst({
                where: {
                    isActive: true,
                    idUserRole: "supadmin",
                    idVillage: user.idVillage
                }
            })

            dataNotif.push({
                idUserTo: perbekel?.id,
                idUserFrom: userId,
                category: 'project',
                idContent: data.id,
                title: 'Kegiatan Baru',
                desc: 'Terdapat kegiatan baru. Silahkan periksa detailnya.'
            })
        } else {
            const atasanGroup = await prisma.user.findMany({
                where: {
                    isActive: true,
                    idGroup: idGroup,
                    AND: {
                        OR: [
                            { idUserRole: 'cosupadmin' },
                            { idUserRole: 'admin' },
                        ]
                    }
                },
                select: {
                    id: true
                }
            })

            const omitData = atasanGroup.map((v: any) => ({
                ..._.omit(v, ["id"]),
                idUserTo: v.id,
                idUserFrom: userId,
                category: 'project',
                idContent: data.id,
                title: 'Kegiatan Baru',
                desc: 'Terdapat kegiatan baru. Silahkan periksa detailnya.'
            }))

            dataNotif.push(...omitData)

        }

        const insertNotif = await prisma.notifications.createMany({
            data: dataNotif
        })


        // create log user
        const log = await createLogUser({ act: 'CREATE', desc: 'User membuat data kegiatan', table: 'project', data: data.id })
        return NextResponse.json({ success: true, message: "Berhasil membuat kegiatan", notif: dataNotif }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal membuat kegiatan, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}