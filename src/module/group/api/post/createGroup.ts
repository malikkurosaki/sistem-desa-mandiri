import { prisma } from "@/module/_global";
import { revalidatePath } from "next/cache";

export async function createGroup(req: Request) {
  try {
    const data = await req.json();
    const villaId = "desa1";

    if (!data || !data.name) {
      return Response.json(
        { success: false, message: "Nama grup harus diisi" },
        { status: 400 }
      );
    }

    const group = await prisma.group.create({
      data: {
        name: data.name,
        isActive: true,
        idVillage: villaId,
      },
      select: {
        id: true,
        name: true,
      },
    });
    revalidatePath("/group");
    return Response.json(group, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
