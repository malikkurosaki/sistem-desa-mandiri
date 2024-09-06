import { prisma } from "@/module/_global";
import { ILogin } from "@/types";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { phone }: ILogin = await req.json();
    const user = await prisma.user.findUnique({
      where: { phone, isActive: true },
      select: { id: true, phone: true },
    });

    if (!user) {
      return Response.json({
        success: false,
        message: "Nomor telepon tidak terdaftar",
      });
    }

    return Response.json({
      success: true,
      message: "Sukses",
      phone: user.phone,
      id: user.id,
    });
    
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error", success: false });
  }
}
