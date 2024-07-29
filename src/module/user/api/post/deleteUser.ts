import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export async function deleteUser(req: NextRequest) {
  try {
    const data = await req.json();
    const update = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        isActive: false,
      },
    });

    return Response.json(
      { success: true, message: "Sukses Delete User" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
