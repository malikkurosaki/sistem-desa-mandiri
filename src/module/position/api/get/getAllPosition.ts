import { prisma } from "@/module/_global";

export async function getAllPosition(req: Request) {
  try {
    const positions = await prisma.position.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return Response.json(positions);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
