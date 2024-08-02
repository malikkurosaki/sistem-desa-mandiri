import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { NextRequest } from "next/server";

export default async function getAllDivision(req: NextRequest) {
   try {
      let grup
      const user = await funGetUserByCookies()
      const searchParams = req.nextUrl.searchParams
      let groupID = searchParams.get('groupID');
      if (groupID == null || groupID == undefined) {
         grup = user.idGroup
      } else {
         grup = groupID
      }

      const division = await prisma.division.findMany({
         where: {
            isActive: true,
            idGroup: grup
         }
      })


      return Response.json(division);
   } catch (error) {
      console.error(error);
      return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
   }
}