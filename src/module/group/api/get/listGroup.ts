import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export async function listGroups(req: NextRequest): Promise<Response> {
  
  try {
    const searchParams = req.nextUrl.searchParams
    const villaId = searchParams.get('villageId');
    const groups = await prisma.group.findMany({
      where: {
        isActive: true,
        idVillage: String(villaId),
      },
      select: {
        id: true,
        name: true,
      },
    });

    return Response.json(groups);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
