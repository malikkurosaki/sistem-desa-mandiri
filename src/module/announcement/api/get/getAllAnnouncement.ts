import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export async function getAllAnnouncement(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const groupID = searchParams.get("groupID");
    const villageID = searchParams.get("villageID");
    const createBy = searchParams.get("createBy");
    const divisionID = searchParams.get("divisionID");
    const announcements = await prisma.annoucement.findMany({
      where: {
        idVillage: String(villageID),
        createdBy: String(createBy),
        isActive: true,
      },
      select: {
        id: true,
        title: true,
        desc: true,
      },
    });

    const announcementMember = await prisma.annoucementMember.findMany({
      where: {
        idGroup: String(groupID),
        idDivision: String(divisionID),
        idAnnoucement: {
          in: announcements.map((announcement: any) => announcement.id),
        },
      },
      select: {
        idAnnoucement: true,
        idGroup: true,
        idDivision: true,
      },
    });

    return Response.json({ announcements, announcementMember });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
