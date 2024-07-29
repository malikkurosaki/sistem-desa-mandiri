import { prisma } from "@/module/_global";
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
      },
    });

    return Response.json({ announcement, announcementMember });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
