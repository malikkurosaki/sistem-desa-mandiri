import { prisma } from "@/module/_global";

export async function createVillage(req: Request) {
  try {
    const data = await req.json();
    const village = await prisma.village.create({
      data: {
        name: data.name,
        desc: data.desc,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        desc: true,
      },
    });

    return Response.json(village, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
