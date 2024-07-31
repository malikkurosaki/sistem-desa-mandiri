import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export default async function getAllDiscussion(req: NextRequest) {
   try {
      const searchParams = req.nextUrl.searchParams
      const divisionID = searchParams.get('divisionID');
      const data = await prisma.divisionDisscussion.findMany({
         where: {
            isActive: true,
            idDivision: String(divisionID)
         }
      })

      return Response.json(data);
   } catch (error) {
      console.error(error);
      return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
   }
}