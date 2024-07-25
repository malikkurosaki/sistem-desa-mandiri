import { prisma } from "@/module/_global";

export async function listGroup(req: Request): Promise<Response> {
  try {
    const groups = await prisma.group.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return Response.json(groups);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
