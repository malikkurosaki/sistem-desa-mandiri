import { ViewEditMember } from "@/module/user/member";

function Page({ params }: { params: { id: string } }) {
   return (
      <ViewEditMember data={params.id}/>
   )
}

export default Page;