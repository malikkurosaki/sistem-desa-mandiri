import { prisma } from "@/module/_global";

export default async function createDivision(req: Request) {
   try {
      const data = await req.json();
      const insert = await prisma.division.create({
         data: {
            name: data.name,
            idVillage: data.idVillage,
            idGroup: data.idGroup,
            desc: data.desc,
            createdBy: data.createdBy
         },
         select: {
            id: true
         }
      })

      const insertMember = await prisma.divisionMember.createMany({
         data: data.member
      })

      return Response.json(insert, { status: 201 });

   } catch (error) {
      console.error(error);
      return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
   }
}