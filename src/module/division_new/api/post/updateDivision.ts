import { prisma } from "@/module/_global";

export default async function updateDivision(req: Request) {
   try {
      const data = await req.json()

      const update = await prisma.division.update({
         where: {
            id: data.id
         },
         data: {
            name: data.name,
            desc: data.desc
         }
      })

      // belom update member nihhhh 

      return Response.json({ success: true, message: "Sukses Update Divisi" }, { status: 200 });
   } catch (error) {
      console.error(error);
      return Response.json({ message: "Internal Server Error", success: false }, { status: 500 });
   }
}