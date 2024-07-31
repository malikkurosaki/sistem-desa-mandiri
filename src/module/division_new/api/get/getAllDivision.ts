import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export default async function getAllDivision(req: NextRequest) {
   try {
      const searchParams = req.nextUrl.searchParams
      const groupID = searchParams.get('active');
      const division = await prisma.division.findMany({
         where: {
            isActive: true,
            idGroup: String(groupID)
         }
      })

      return Response.json(division);
   } catch (error) {
      console.error(error);
      return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
   }
}