import { Box } from "@mantine/core";
import DetailAnnouncement from "../component/detail_announcement";
import NavbarDetailAnnouncement from "../component/ui/navbar_detail_announcement";

export default function ViewDetailAnnouncement({ data }: { data: string }) {
   return (
      <Box>
         <NavbarDetailAnnouncement />
         <DetailAnnouncement id={data} />
      </Box>
   )
}