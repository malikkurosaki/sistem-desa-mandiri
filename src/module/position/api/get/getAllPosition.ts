import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _, { omit } from "lodash";
import { NextRequest } from "next/server";

export async function getAllPosition(req: NextRequest) {
  try {

    let grupFix
    const searchParams = req.nextUrl.searchParams
    const groupID = searchParams.get('groupId');
    const active = searchParams.get('active');
    const name = searchParams.get('name')
    const user = await funGetUserByCookies()

    if (groupID == "null") {
      grupFix = user.idGroup
    } else {
      grupFix = groupID
    }

    const positions = await prisma.position.findMany({
      where: {
        idGroup: String(grupFix),
        isActive: (active == "true" ? true : false),
        name: {
          contains: String(name),
          mode: "insensitive"
        }
      },
      select: {
        id: true,
        name: true,
        isActive: true,
        Group: {
          select: {
            name: true
          }
        }
      },
    });

    const allData = positions.map((v: any) => ({
      ..._.omit(v, ["Group"]),
      group: v.Group.name
    }))

    return Response.json(allData);
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
