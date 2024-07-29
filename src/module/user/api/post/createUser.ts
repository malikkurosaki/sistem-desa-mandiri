import { createLogUser } from '@/module/user';
import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export async function createUser(req: NextRequest) {
  try {
    const data = await req.json();

    const users = await prisma.user.create({
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
      select: {
        id: true,
        nik: true,
        name: true,
        phone: true,
        email: true,
        gender: true,
      },
    });

    // create log user
    const log = await createLogUser({ act: 'CREATE', desc: 'User membuat data user baru', table: 'user', data: users.id })

    return Response.json({ success: true, message: 'Sukses membuat user' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
