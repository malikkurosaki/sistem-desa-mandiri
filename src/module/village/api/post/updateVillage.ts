import { prisma } from "@/module/_global";
import { createLogUser } from "@/module/user";

export async function updateVillage(req: Request) {
  try {
    const data = await req.json();

    const update = await prisma.village.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        desc: data.desc,
      },
    });

    // create log user
    const log = await createLogUser({ act: 'UPDATE', desc: 'User mengupdate data desa baru', table: 'village', data: data.id })

    return Response.json(
      { success: true, message: "Sukses edit desa" },
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
