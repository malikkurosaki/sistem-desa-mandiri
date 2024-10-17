import { prisma } from "@/module/_global";

export async function getOneVillage(req: Request) {
  try {
    const village = "11";
    const getOne = await prisma.village.findUnique({
      where: {
        id: village,
      },
      select: {
        id: true,
        name: true,
        desc: true,
      },
    });

    if (!getOne) {
      return Response.json(
        { message: "Village tidak ditemukan", success: false },
        { status: 404 }
      );
    }

    return Response.json(getOne);
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
