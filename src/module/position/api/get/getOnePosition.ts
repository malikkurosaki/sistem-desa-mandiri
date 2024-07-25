import { prisma } from "@/module/_global";

export async function getOnePosition(req: Request) {
  try {
    const positionId = "2";
    const getOne = await prisma.position.findUnique({
      where: {
        id: positionId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return Response.json(getOne);
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
