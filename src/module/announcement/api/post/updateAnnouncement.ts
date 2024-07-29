import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export async function updateAnnouncement(req: NextRequest) {
  try {
    const data = await req.json();
    const udpate = await prisma.announcement.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        desc: data.desc,
        idVillage: data.idVillage,
        createdBy: data.createBy,
        isActive: true,
      },
    });

    const deleteAnnouncement = await prisma.announcementMember.deleteMany({
      where: {
        idAnnouncement: data.id,
      },
    });

    const dataMember = data.groups.map((group: any) => ({
      idAnnoucement: data.id,
      idGroup: group.idGroup,
      idDivision: group.idDivision,
      isActive: true,
    }));

    const announcementMember = await prisma.announcementMember.createMany({
      data: dataMember,
    });

    return Response.json({
      success: true,
      message: "Sukses Update Announcement",
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
