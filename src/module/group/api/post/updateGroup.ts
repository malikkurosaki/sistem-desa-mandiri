import { prisma } from "@/module/_global";

export async function updateGroup(req: Request) {
  try {
    const data = await req.json();

    const update = await prisma.group.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        idVillage: data.idVillage,
      },
    });
    return Response.json({ success: true, message: "Sukses Update Grup" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error", success: false }, { status: 500 });
  }
}
