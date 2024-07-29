import { prisma } from "@/module/_global";

export async function createGroup(req: Request) {
  try {
    const data = await req.json();


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
        idVillage: data.idVillage,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return Response.json(group, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
