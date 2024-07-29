import { createLogUser } from '@/module/user';
import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export async function updateUser(req: NextRequest) {
  try {
    const data = await req.json();

    const updates = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        nik: data.nik,
        name: data.name,
        phone: data.phone,
        email: data.email,
        gender: data.gender,
        idGroup: data.idGroup,
        idVillage: data.idVillage,
        idPosition: data.idPosition,
        idUserRole: data.idUserRole,
      },
    });

    // create log user
    const log = await createLogUser({ act: 'UPDATE', desc: 'User mengupdate data user', table: 'user', data: data.id })

    return Response.json(
      { success: true, message: "Sukses Update User" },
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
