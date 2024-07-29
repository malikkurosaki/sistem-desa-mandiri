import { prisma } from "@/module/_global";
import { createLogUser } from "@/module/user";

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

    // create log user
    const log = await createLogUser({ act: 'CREATE', desc: 'User membuat data desa baru', table: 'village', data: village.id })
    
    return Response.json({ success: true, message: 'Sukses membuat desa baru' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
