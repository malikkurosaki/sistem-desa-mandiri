import { DIR, funUploadFile, prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
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
            }
        })

        const omitData = data.map((v: any) => ({
            ..._.omit(v, ["ProjectMember"]),
            member: v.ProjectMember.length
        }))

        const filter = await prisma.group.findUnique({
            where: {
                id: grup
            },
            select: {
                id: true,
                name: true
            }
        })


        return NextResponse.json({ success: true, message: "Berhasil mendapatkan kegiatan", data: omitData, filter }, { status: 200 });

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


        // create log user
        const log = await createLogUser({ act: 'CREATE', desc: 'User membuat data kegiatan', table: 'project', data: data.id })
        return NextResponse.json({ success: true, message: "Berhasil membuat kegiatan" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal membuat kegiatan, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}