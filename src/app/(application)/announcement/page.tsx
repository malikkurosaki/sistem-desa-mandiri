import { ViewFilter } from "@/module/_global";
import { ViewListAnnouncement } from "@/module/announcement";

function Page({ searchParams }: { searchParams: { page: string } }) {
   if (searchParams.page == 'filter')
      return <ViewFilter linkFilter="announcement"/>
   return (
      <ViewListAnnouncement />
   )
}

export default Page;