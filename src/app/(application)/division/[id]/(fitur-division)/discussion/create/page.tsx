import { LayoutNavbarNew } from "@/module/_global";
import { FormCreateDiscussion } from "@/module/discussion";

function Page({ params }: { params: { id: string } }) {
   return (
      <>
         <LayoutNavbarNew back="" title="Tambah Diskusi" menu={<></>} />
         <FormCreateDiscussion id={params.id} />
      </>
   )
}

export default Page;