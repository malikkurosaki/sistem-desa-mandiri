import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { NextRequest } from "next/server";

export async function listGroups(req: NextRequest): Promise<Response> {
  try {
    const user = await funGetUserByCookies()
    const searchParams = req.nextUrl.searchParams
    const villaId = user.idVillage
    const active = searchParams.get('active');
    const name = searchParams.get('name');
    const groups = await prisma.group.findMany({
      where: {
        isActive: (active == "true" ? true : false),
        idVillage: String(villaId),
        name: {
          contains: String(name),
          mode: "insensitive"
        }
      },
      select: {
        id: true,
        name: true,
        isActive: true
      },
    });

    return Response.json(groups);
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
