import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import { revalidatePath } from "next/cache";

export default async function createDivision(req: Request) {
   try {
      const sent = await req.json();
      const user = await funGetUserByCookies();

      const insertDivision = await prisma.division.create({
         data: {
            name: sent.data.name,
            idVillage: String(user.idVillage),
            idGroup: sent.data.idGroup,
            desc: sent.data.desc,
            createdBy: String(user.id)
         },
         select: {
            id: true
         }
      })

      const dataMember = sent.member.map((v: any) => ({
         ..._.omit(v, ["isActive", "nik", "name", "phone", "email", "gender", "group", "position"]),
         idUser: v.id,
         idDivision: insertDivision.id,
         isAdmin: sent.admin.some((i: any) => i == v.id)
      }))

      const insertMember = await prisma.divisionMember.createMany({
         data: dataMember
      })

      revalidatePath("/division");

      return Response.json({ success: true, message: "Sukses menambahkan data divisi" }, { status: 201 });

   } catch (error) {
      console.error(error);
      return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
   }
}