import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export async function getAllPosition(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const groupID = searchParams.get('groupID');
    const positions = await prisma.position.findMany({
      where: {
        idGroup: String(groupID),
        isActive: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return Response.json(positions);
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
