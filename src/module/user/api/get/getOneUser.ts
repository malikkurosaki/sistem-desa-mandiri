import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export async function getOneUser(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const idUser = searchParams.get("userID");

    const users = await prisma.user.findUnique({
      where: {
        id: String(idUser),
      },
      select: {
        id: true,
        nik: true,
        name: true,
        phone: true,
        email: true,
        gender: true,
      },
    });

    return Response.json(users);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Errorr", success: false }, { status: 500 });
  }
}
