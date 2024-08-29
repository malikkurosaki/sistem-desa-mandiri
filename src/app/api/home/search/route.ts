

// SEARCH USER, DIVISION, PROJECT

import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const search = searchParams.get("search")
        const userId = await funGetUserByCookies()
        if (userId.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        let kondisi: any, kondisiProject: any

        // klo perbekel == semua grup
        if (userId.idUserRole == "supadmin") {
            kondisi = {
                isActive: true,
                idVillage: userId.idVillage,
                Group: {
                    isActive: true,
                },
                name: {
                    contains: (search == undefined || search == null) ? "" : search,
                    mode: "insensitive"
                }
            }

            kondisiProject = {
                isActive: true,
                idVillage: userId.idVillage,
                Group: {
                    isActive: true,
                },
                title: {
                    contains: (search == undefined || search == null) ? "" : search,
                    mode: "insensitive"
                }
            }
        } else {
            kondisi = {
                idVillage: userId.idVillage,
                isActive: true,
                idGroup: userId.idGroup,
                name: {
                    contains: (search == undefined || search == null) ? "" : search,
                    mode: "insensitive"
                }
            }

            kondisiProject = {
                idVillage: userId.idVillage,
                isActive: true,
                idGroup: userId.idGroup,
                title: {
                    contains: (search == undefined || search == null) ? "" : search,
                    mode: "insensitive"
                }
            }
        }

        const user = await prisma.user.findMany({
            where: kondisi,
            select: {
                id: true,
                name: true,
                email: true,
                img: true,
                Position: {
                    select: {
                        name: true
                    }
                },
                Group: {
                    select: {
                        name: true
                    }
                }
            }
        })

        const userOmit = user.map((v: any) => ({
            ..._.omit(v, ["Position", "Group"]),
            position: v.Position.name,
            group: v.Group.name
        }))

        const divisions = await prisma.division.findMany({
            where: kondisi,
            select: {
                id: true,
                name: true,
                desc: true,
                Group: {
                    select: {
                        name: true
                    }
                }
            }
        })

        const divisionOmit = divisions.map((v: any) => ({
            ..._.omit(v, ["Group"]),
            group: v.Group.name
        }))

        const projects = await prisma.project.findMany({
            where: kondisiProject,
            select: {
                id: true,
                title: true,
                Group: {
                    select: {
                        name: true
                    }
                }
            }
        })

        const projectOmit = projects.map((v: any) => ({
            ..._.omit(v, ["Group"]),
            group: v.Group.name
        }))

        const allDataSearch = {
            user: userOmit,
            division: divisionOmit,
            project: projectOmit
        }
        return NextResponse.json({ success: true, data: allDataSearch }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error }, { status: 500 });
    }
}