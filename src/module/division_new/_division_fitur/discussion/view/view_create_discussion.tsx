import { LayoutNavbarNew } from "@/module/_global";
import FormCreateDiscussion from "../component/form_create_discussion";

export default function ViewCreateDiscussion() {
   return (
      <>
         <LayoutNavbarNew back="" title="Tambah Diskusi" menu={<></>} />
         <FormCreateDiscussion />
      </>
   )
}