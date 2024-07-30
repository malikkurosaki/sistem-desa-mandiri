import { prisma } from "@/module/_global";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function deleteGroup(req: NextRequest) {
  try {
    const data = await req.json();
    const active = data.isActive;

    await prisma.group.update({
      where: {
        id: data.id,
      },
      data: {
        isActive: !active,
      },
    });

    revalidatePath("/group");

    return Response.json(
      { success: true, message: "Sukses update status grup" },
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
