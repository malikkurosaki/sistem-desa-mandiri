import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export async function getRoleUser(req: NextRequest) {
  try {
    const res = await prisma.userRole.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return Response.json(res);
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
