import { ViewFilter } from "@/module/_global";
import { ViewListMember } from "@/module/user/member";

function Page({ searchParams }: { searchParams: { page: string } }) {
   if (searchParams.page == "filter")
      return <ViewFilter linkFilter="member"/>
      
   return (
      <ViewListMember />
   )
}

export default Page;