import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import { NextRequest } from "next/server";

export async function getAllUser(req: NextRequest) {
  try {
    let fixGroup
    const searchParams = req.nextUrl.searchParams;
    const idGroup = searchParams.get("groupID");
    const active = searchParams.get("active");
    const user = await funGetUserByCookies();

    if (idGroup == null || idGroup == undefined) {
      fixGroup = user.idGroup
    } else {
      fixGroup = idGroup
    }

    const users = await prisma.user.findMany({
      where: {
        isActive: active == "true" ? true : false,
        idGroup: String(fixGroup),
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
