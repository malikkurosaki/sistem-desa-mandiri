import { prisma } from "@/module/_global";
import _ from "lodash";
import { NextRequest } from "next/server";

export async function getAllUser(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const idGroup = "group1";
    const idVillage = "desa1";
    const active = searchParams.get("active");

    const users = await prisma.user.findMany({
      where: {
        isActive: active == "true" ? true : false,
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
        Position: {
          select: {
            name: true,
          },
        },
        Group: {
          select: {
            name: true,
          },
        },
      },
    });

    const allData = users.map((v: any) => ({
      ..._.omit(v, ["Group", "Position"]),
      group: v.Group.name,
      position: v.Position.name,
    }));

    return Response.json(allData);

  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
