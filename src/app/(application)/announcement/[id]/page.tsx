import { ViewDetailAnnouncement } from "@/module/announcement";

function Page({ params }: { params: { id: string } }) {
   return (
      <ViewDetailAnnouncement data={params.id} />
   )
}

export default Page;