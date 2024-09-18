import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import moment from "moment";
import "moment/locale/id";
import { NextResponse } from "next/server";
import { createLogUser } from '@/module/user';
import mtqq_client from "../../../module/_global/bin/mqtt_client";

export const dynamic = 'force-dynamic'



// GET ALL PENGUMUMAN
export async function GET(request: Request) {
    try {
        const user = await funGetUserByCookies();
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const villageId = user.idVillage
        const roleUser = user.idUserRole
        const groupId = user.idGroup
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('search');

        let kondisi: any = {
            idVillage: String(villageId),
            isActive: true,
            title: {
                contains: (name == undefined || name == null) ? "" : name,
                mode: "insensitive"
            }
        }

        if (roleUser != "supadmin") {
            if (roleUser == "cosupadmin" || roleUser == "admin") {
                kondisi = {
                    idVillage: String(villageId),
                    isActive: true,
                    title: {
                        contains: (name == undefined || name == null) ? "" : name,
                        mode: "insensitive"
                    },
                    AnnouncementMember: {
                        some: {
                            idGroup: String(groupId)
                        }
                    }

                }
            } else {
                kondisi = {
                    idVillage: String(villageId),
                    isActive: true,
                    title: {
                        contains: (name == undefined || name == null) ? "" : name,
                        mode: "insensitive"
                    },
                    AnnouncementMember: {
                        some: {
                            idGroup: String(groupId),
                            Division: {
                                DivisionMember: {
                                    some: {
                                        idUser: String(user.id)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


        const announcements = await prisma.announcement.findMany({
            where: kondisi,
            select: {
                id: true,
                title: true,
                desc: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const allData = announcements.map((v: any) => ({
            ..._.omit(v, ["createdAt"]),
            createdAt: moment(v.createdAt).format("ll")
        }))

        return NextResponse.json({ success: true, message: "Berhasil mendapatkan pengumuman", data: allData, }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan pengumuman, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}



// CREATE PENGUMUMAN
export async function POST(request: Request) {
    try {
        const user = await funGetUserByCookies();
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { title, desc, groups } = (await request.json());
        const villaId = user.idVillage
        const userId = user.id

        const data = await prisma.announcement.create({
            data: {
                title,
                desc,
                idVillage: String(villaId),
                createdBy: String(userId),
            },
            select: {
                id: true,
            }
        });

        let memberDivision = []

        // for (var i = 0, l = groups.length; i < l; i++) {
        //     var obj = groups[i].Division;
        //     for (let index = 0; index < obj.length; index++) {
        //         const element = obj[index];
        //         const fix = {
        //             idAnnouncement: data.id,
        //             idGroup: groups[i].id,
        //             idDivision: element.id
        //         }
        //         memberDivision.push(fix)
        //     }
        // }

        // const announcementMember = await prisma.announcementMember.createMany({
        //     data: memberDivision,
        // });

        const memberNotif = await prisma.divisionMember.findMany({
            where: {
                Division: {
                    AnnouncementMember: {
                        some: {
                            idAnnouncement: data.id
                        }
                    }
                }
            },
            select: {
                idUser: true
            }
        })



        const dataNotif = memberNotif.map((v: any) => ({
            ..._.omit(v, ["idUser"]),
            idUserTo: v.idUser,
            idUserFrom: userId,
            category: 'announcement',
            idContent: data.id,
            title: 'Pengumuman Baru',
            desc: 'Anda memiliki pengumuman baru. Silahkan periksa detailnya.'
        }))




        // const insertNotif = await prisma.notifications.createMany({
        //     data: dataNotif
        // })

        for (let index = 0; index < dataNotif.length; index++) {

            const user = dataNotif[index].idUserTo
            const title = dataNotif[index].title
            const desc = dataNotif[index].desc


            mtqq_client.publish("app_SDM", JSON.stringify({
                "user": "clzm6swhg000tfgbhm3bau9ti",
                "title": title,
                "category": "announcement",
                "description": desc
            }))
        }


        // create log user
        const log = await createLogUser({ act: 'CREATE', desc: 'User membuat data pengumuman baru', table: 'announcement', data: data.id })

        return NextResponse.json({ success: true, message: "Berhasil membuat pengumuman" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal membuat pengumuman, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}