import { LayoutNavbarNew } from "@/module/_global";
import { FormCreateDiscussion } from "@/module/discussion";

function Page() {
   return (
      <>
         <LayoutNavbarNew back="" title="Tambah Diskusi" menu={<></>} />
         <FormCreateDiscussion />
      </>
   )
}

export default Page;