import { prisma } from "@/module/_global";

export async function getAllVillage(req: Request) {
  try {
    const villages = await prisma.village.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        desc: true,
      },
    });

    return Response.json(villages);
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
