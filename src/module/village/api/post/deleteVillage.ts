import { prisma } from "@/module/_global";
import { createLogUser } from "@/module/user";

export async function deleteVillage(req: Request) {
  try {
    const data = await req.json();
    const update = await prisma.village.update({
      where: {
        id: data.id,
      },
      data: {
        isActive: false,
      },
    });

    // create log user
    const log = await createLogUser({ act: 'DELETE', desc: 'User menghapus data desa', table: 'village', data: data.id })

    return Response.json(
      { success: true, message: "Sukses menghapus data desa" },
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
