import { ViewDetailMember } from "@/module/user/member";

function Page({ params }: { params: { id: string } }) {
   return (
      <ViewDetailMember data={params.id} />
   )
}

export default Page;

