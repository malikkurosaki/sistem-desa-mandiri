import { prisma } from "@/module/_global";
import _ from "lodash";
import { NextRequest } from "next/server";

export async function getOneAnnouncement(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const announcementId = searchParams.get("announcementId");
    const announcement = await prisma.announcement.findUnique({
      where: {
        id: String(announcementId),
      },
      select: {
        id: true,
        title: true,
        desc: true,
      },
    });
    const announcementMember = await prisma.announcementMember.findMany({
      where: {
        idAnnouncement: String(announcementId),
      },
      select: {
        idAnnouncement: true,
        idGroup: true,
        idDivision: true,
        Group: {
          select: {
            name: true,
          },
        },
      },
    });

    const allAnnouncementMember = announcementMember.map((v: any) => ({
      ..._.omit(v, ["Group"]),
      group: v.Group.name,
    }))

    console.log(allAnnouncementMember)

    return Response.json({ announcement, allAnnouncementMember });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
