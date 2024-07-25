import { prisma } from "@/module/_global";

export async function updateVillage(req: Request) {
  try {
    const data = await req.json();

    const update = await prisma.village.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        desc: data.desc,
      },
    });

    return Response.json(
      { success: true, message: "Sukses Update Village" },
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
