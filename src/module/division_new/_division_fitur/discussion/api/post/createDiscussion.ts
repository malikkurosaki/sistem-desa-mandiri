import { prisma } from "@/module/_global";

export default async function createDiscussion(req: Request) {
   try {
      const data = await req.json();
      const insert = await prisma.divisionDisscussion.create({
         data: {
            idDivision: data.idDivision,
            desc: data.desc,
            createdBy: data.createdBy
         },
         select: {
            id: true
         }
      })

      return Response.json(insert, { status: 201 });

   } catch (error) {
      console.error(error);
      return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
   }
}