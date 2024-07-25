import { prisma } from "@/module/_global";

export async function getOneGroup(req: Request): Promise<Response> {
  try {
    // const groupId = req.params.id;
    const groupId = "clz0v4kce0009e6mukfhzmyzb";
    const getOne = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!getOne) {
      return Response.json(
        { message: "Grup tidak ditemukan", success: false },
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
