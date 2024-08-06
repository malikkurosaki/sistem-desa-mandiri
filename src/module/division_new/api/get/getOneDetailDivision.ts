import { prisma } from '@/module/_global';
import { NextRequest } from "next/server";

export default async function getOneDetailDivision(req: NextRequest) {
   try {
      const searchParams = req.nextUrl.searchParams
      const id = searchParams.get('divisionId');

      console.log('aaaaa',id)
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

      const tugas = await prisma.divisionProject.count({
         where: {
            idDivision: String(id),
            status: {
               lte: 1
            },
            isActive: true
         }
      })

      const dokumen = await prisma.divisionDocumentFolderFile.count({
         where: {
            idDivision: String(id),
            isActive: true,
            category: "FILE"
         }
      })

      const diskusi = await prisma.divisionDisscussion.count({
         where: {
            idDivision: String(id),
            isActive: true,
            status: 1
         }
      })

      const kalender = await prisma.divisionCalendar.count({
         where: {
            idDivision: String(id),
            isActive: true,
            dateStart: {
               lte: new Date()
            }
         }
      })

      const allData = {
         // division: division,
         division:{name:id},
         jumlah:{
            tugas: 1,
            dokumen: dokumen,
            diskusi: diskusi,
            kalender: kalender
         },
         member: member,
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