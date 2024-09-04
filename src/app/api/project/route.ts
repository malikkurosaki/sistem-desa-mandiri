import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";


// GET ALL DATA PROJECT
export async function GET(request: Request) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

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


        const data = await prisma.project.findMany({
            where: {
                isActive: true,
                idVillage: String(villageId),
                idGroup: grup,
                createdBy: String(userId),
                title: {
                    contains: (name == undefined || name == "null") ? "" : name,
                    mode: "insensitive"
                },
                status: (status == "0" || status == "1" || status == "2" || status == "3") ? Number(status) : 0
            },
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


        return NextResponse.json({ success: true, message: "Berhasil mendapatkan project", data: omitData, }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan project, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
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
            const root = path.join(process.cwd(), "./public/file/project/");
            for (var pair of body.entries()) {
                if (String(pair[0]).substring(0, 4) == "file") {
                    const file = body.get(pair[0]) as File
                    const fExt = file.name.split(".").pop()
                    const fName = file.name.replace("." + fExt, "")


                    const insertToTable = await prisma.projectFile.create({
                        data: {
                            idProject: data.id,
                            name: fName,
                            extension: String(fExt)
                        },
                        select: {
                            id: true
                        }
                    })

                    const nameFix = insertToTable.id + '.' + fExt
                    const filePath = path.join(root, nameFix)
                    // Konversi ArrayBuffer ke Buffer
                    const buffer = Buffer.from(await file.arrayBuffer());
                    // Tulis file ke sistem
                    fs.writeFileSync(filePath, buffer);
                }
            }
        }


        return NextResponse.json({ success: true, message: "Berhasil membuat kegiatan" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal membuat kegiatan, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}