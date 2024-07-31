import { prisma } from "@/module/_global";

export default async function createCommentDiscussion(req: Request) {
   try {
      const data = await req.json()
      const insert = await prisma.divisionDisscussionComment.create({
         data: {
            idDisscussion: data.idDiscussion,
            comment: data.comment,
            createdBy: data.createdBy
         }
      })
      return Response.json(insert, { status: 201 });

   } catch (error) {
      console.error(error);
      return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
   }
}