import { prisma } from "@/module/_global";

export default async function deleteDivision(req: Request) {
   try {
      const data = await req.json();
      const update = await prisma.division.update({
         where: {
            id: data.id,
         },
         data: {
            isActive: false,
         },
      });
   } catch (error) {
      console.error(error);
      return Response.json(
         { message: "Internal Server Error", success: false },
         { status: 500 }
      );
   }
}