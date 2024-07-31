import { prisma } from "@/module/_global";

export async function createlPosition(req: Request) {
  try {
    const data = await req.json();
    const cek = await prisma.position.count({
      where: {
        name: data.name,
        idGroup: data.idGroup,
      },
    });
    if (cek == 0) {
      const positions = await prisma.position.create({
        data: {
          name: data.name,
          idGroup: data.idGroup,
        },
        select: {
          id: true,
          name: true,
        },
      });

      return Response.json(positions, { status: 201 });
    } else {
      return Response.json(
        { success: false, message: "Position sudah ada" },
        { status: 400 }
      );
    }
    
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
