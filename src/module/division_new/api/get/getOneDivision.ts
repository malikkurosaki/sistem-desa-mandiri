import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export default async function getOneDivision(req: NextRequest) {
   try {
      const searchParams = req.nextUrl.searchParams
      const id = searchParams.get('divisionID');
      const division = await prisma.division.findUnique({
         where: {
            id: String(id),
         },
         select: {
            id: true,
            name: true,
         },
      });

      const member = await prisma.divisionMember.findMany({
         where: {
            idDivision: String(id),
         },
         select: {
            idUser: true,
            isLeader: true
         }
      })

      const allData = {
         division: division,
         member: member
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