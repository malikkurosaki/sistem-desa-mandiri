import { prisma } from "@/module/_global";

export default async function updateDiscussion(req: Request) {
   try {
      const data = await req.json()

      const update = await prisma.divisionDisscussion.update({
         where:{
            id: data.id
         },
         data:{
            desc: data.desc,
         }
      })

      return Response.json({ success: true, message: "Sukses Update Diskusi" }, { status: 200 });
   } catch (error) {
      console.error(error);
      return Response.json({ message: "Internal Server Error", success: false }, { status: 500 });
   }
}