import { prisma } from "@/module/_global";
import _, { omit } from "lodash";
import { NextRequest } from "next/server";

export async function getAllPosition(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const groupID = "3";
    const active = searchParams.get('active');
    const positions = await prisma.position.findMany({
      where: {
        idGroup: String(groupID),
        isActive: (active == "true" ? true : false),
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
