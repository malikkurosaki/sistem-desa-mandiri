import { createLogUser } from '@/module/user';
import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";
import { revalidatePath } from 'next/cache';

export async function deleteUser(req: NextRequest) {
  try {
    const data = await req.json();
    const active = data.isActive;
    const update = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        isActive: !active,
      },
    });

    revalidatePath("/member");

    // create log user
    const log = await createLogUser({ act: 'DELETE', desc: 'User menghapus data user', table: 'user', data: update.id })

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
