import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export async function getAllUser(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const users = await prisma.user.findMany({
      where: {
        isActive: true,
        idUserRole: String(searchParams.get("roleID")),
        idPosition: String(searchParams.get("positionID")),
        idVillage: String(searchParams.get("villageID")),
        idGroup: String(searchParams.get("groupID")),
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
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
