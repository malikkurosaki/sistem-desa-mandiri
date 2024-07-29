import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export async function getOneGroup(req: NextRequest): Promise<Response> {
  try {
    const searchParams = req.nextUrl.searchParams
    const groupId = searchParams.get('groupId');
    const getOne = await prisma.group.findUnique({
      where: {
        id: String(groupId),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!getOne) {
      return Response.json(
        { message: "Grup tidak ditemukan", success: false },
        { status: 404 }
      );
    }

    return Response.json(getOne);
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
