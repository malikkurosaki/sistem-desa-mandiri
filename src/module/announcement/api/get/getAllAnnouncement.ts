import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import moment from "moment";
import "moment/locale/id";
import { NextRequest } from "next/server";

export async function getAllAnnouncement(req: NextRequest) {
  try {
    const user = await funGetUserByCookies();
    const villageId = user.idVillage
    const announcements = await prisma.announcement.findMany({
      where: {
        idVillage: String(villageId),
        isActive: true,
      },
      select: {
        id: true,
        title: true,
        desc: true,
        createdAt: true,
      },
    });

    const allData = announcements.map((v: any) => ({
      ..._.omit(v, ["createdAt"]),
      createdAt: moment(v.createdAt).format("LL")
    }))

    return Response.json(allData);
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
