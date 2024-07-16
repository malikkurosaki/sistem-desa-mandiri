import { LayoutNavbarNew } from "@/module/_global";
import FormEditDiscussion from "../component/form_edit_discussion";

export default function ViewEditDiscussion() {
   return (
      <>
         <LayoutNavbarNew back="" title="Edit Diskusi" menu={<></>} />
         <FormEditDiscussion />
      </>
   )
}