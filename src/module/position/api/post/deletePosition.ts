import { prisma } from "@/module/_global";

export async function deletePosition(req: Request) {
  try {
    const data = await req.json();

    const update = await prisma.position.update({
      where: {
        id: data.id,
      },
      data: {
        isActive: false,
      },
    });

    return Response.json(
      { success: true, message: "Sukses Delete Position" },
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
