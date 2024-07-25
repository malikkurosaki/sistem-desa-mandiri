
import { prisma } from "@/module/_global";
import { ILogin } from "@/types";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { phone }: ILogin = await req.json();
  const user = await prisma.user.findUnique({
    where: { phone, isActive: true },
    select: { id: true, phone: true },
  });

  if (!user) {
    return Response.json({
      success: false,
      message: "Email atau Password salah",
    });
  }

  return Response.json({
    success: true,
    message: "Login Berhasil",
    phone: user.phone,
    id: user.id,
  });
}
