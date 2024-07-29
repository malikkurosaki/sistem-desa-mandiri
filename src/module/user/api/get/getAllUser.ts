import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export async function getAllUser(req: NextRequest) {
  try {

    const searchParams = req.nextUrl.searchParams;
    const idGroup = searchParams.get('groupID');
    const idUserRole = searchParams.get('roleID');
    const idPosition = searchParams.get('positionID');
    const idVillage = searchParams.get('villageID');

    const users = await prisma.user.findMany({
      where: {
        isActive: true,
        idUserRole: String(idUserRole),
        idPosition: idPosition,
        idVillage: idVillage,
        idGroup: idGroup,
      },
      select: {
        id: true,
        nik: true,
        name: true,
        phone: true,
        email: true,
        gender: true,
      },
    });

    return Response.json(users);
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
