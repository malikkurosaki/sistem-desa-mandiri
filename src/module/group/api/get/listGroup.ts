import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export async function listGroups(req: NextRequest): Promise<Response> {

  try {
    const searchParams = req.nextUrl.searchParams
    const villaId = "desa1"
    const active = searchParams.get('active');
    const groups = await prisma.group.findMany({
      where: {
        isActive: (active == "true" ? true : false),
        idVillage: String(villaId),
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
