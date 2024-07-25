import { prisma } from "@/module/_global";

export async function createlPosition(req: Request) {
  try {
    const data = await req.json();

    const positions = await prisma.position.create({
      data: {
        name: data.name,
        isActive: true,
        idGroup: data.idGroup,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return Response.json(positions, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
