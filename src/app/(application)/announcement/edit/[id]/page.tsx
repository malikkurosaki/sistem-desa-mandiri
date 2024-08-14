import { EditAnnouncement } from "@/module/announcement";
import { Box } from "@mantine/core";

function Page({ params }: { params: { id: any } }) {
   return (
      <Box>
         <EditAnnouncement />
      </Box>
   )
}

export default Page;