import { prisma } from "@/module/_global";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function deletePosition(req: NextRequest) {
  try {
    const data = await req.json();
    const active = data.isActive;

    const update = await prisma.position.update({
      where: {
        id: data.id,
      },
      data: {
        isActive: !active,
      },
    });

    revalidatePath("/position");
    return Response.json(
      { success: true, message: "Sukses Delete Position" },
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
