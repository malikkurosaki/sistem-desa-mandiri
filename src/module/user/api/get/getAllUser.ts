import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export async function getAllUser(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const idGroup = "2";
    const idVillage = "121212";
    const active = searchParams.get("active");

    const users = await prisma.user.findMany({
      where: {
        isActive: active == "true" ? true : false,
        idUserRole: String(idUserRole),
        idPosition: String(idPosition),
        idVillage: String(idVillage),
        idGroup: String(idGroup),
      },
      select: {
        id: true,
        isActive: true,
        nik: true,
        name: true,
        phone: true,
        email: true,
        gender: true,
        Group: {
          select: {
            name: true,
          },
        },
      },
    });

    return Response.json(users);
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
