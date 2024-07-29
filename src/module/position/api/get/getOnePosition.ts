import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export async function getOnePosition(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const positionId = searchParams.get('positionId');
    const getOne = await prisma.position.findUnique({
      where: {
        id: String(positionId),
      },
      select: {
        id: true,
        name: true,
      },
    });

    return Response.json(getOne);
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
