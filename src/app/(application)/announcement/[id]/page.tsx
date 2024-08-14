import { DetailAnnouncement, NavbarDetailAnnouncement } from "@/module/announcement";
import { Box } from "@mantine/core";

function Page({ params }: { params: { id: string } }) {
   return (
      <Box>
         <NavbarDetailAnnouncement />
         <DetailAnnouncement id={params.id} />
      </Box>
   )
}

export default Page;