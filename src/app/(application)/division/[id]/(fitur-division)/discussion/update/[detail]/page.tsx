import { LayoutNavbarNew } from "@/module/_global";
import { FormEditDiscussion } from "@/module/discussion";
import { Box } from "@mantine/core";

function Page() {
   return (
      <Box>
         <LayoutNavbarNew back="" title="Edit Diskusi" menu={<></>} />
         <FormEditDiscussion />
      </Box>

   )
}

export default Page;