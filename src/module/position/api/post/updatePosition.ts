import { prisma } from "@/module/_global"

export async function updatePosition(req: Request) {
    try {
        const data = await req.json()

        const update = await prisma.position.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                idGroup: data.idGroup
            }
        })
        
        return Response.json({ success: true, message: "Sukses Update Position" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: "Internal Server Error", success: false }, { status: 500 });
      }
}