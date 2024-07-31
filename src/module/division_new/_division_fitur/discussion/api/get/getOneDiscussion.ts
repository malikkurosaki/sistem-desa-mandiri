import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export default async function getOneDiscussion(req: NextRequest) {
   try {
      const searchParams = req.nextUrl.searchParams
      const id = searchParams.get('id');
      const data = await prisma.divisionDisscussion.findUnique({
         where: {
            id: String(id)
         }
      })

      const comment = await prisma.divisionDisscussionComment.findMany({
         where: {
            idDisscussion: String(id)
         }
      })

      const allData = {
         data: data,
         comment: comment
      }

      return Response.json(allData);

   } catch (error) {
      console.error(error);
      return Response.json(
         { message: "Internal Server Error", success: false },
         { status: 500 }
      );
   }
}