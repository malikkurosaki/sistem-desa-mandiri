import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import moment from "moment";
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

        const { idGroup, title, task, member, file } = (await request.json())
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
                ..._.omit(v, ["idUser", "name"]),
                idProject: data.id,
                idUser: v.idUser,
            }))

            const insertMember = await prisma.projectMember.createMany({
                data: dataMember
            })
        }

        let fileFix: any[] = []

        if (file.length > 0) {
            file.map((v: any, index: any) => {
                const f: any = file[index].get('file')
                const fName = f.name
                const fExt = fName.split(".").pop()
                // funUploadFile(fName, f)

                const dataFile = {
                    name: fName,
                    extension: fExt,
                    idProject: data.id,
                }

                fileFix.push(dataFile)
            })

            const insertFile = await prisma.divisionProjectFile.createMany({
                data: fileFix
            })

        }


        return NextResponse.json({ success: true, message: "Berhasil membuat kegiatan", data: data, }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal membuat kegiatan, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}