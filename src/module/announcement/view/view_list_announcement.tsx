import { Box } from "@mantine/core";
import NavbarAnnouncement from "../component/ui/navbar_announcement";
import ListAnnouncement from "../component/list_announcement";

export default function ViewListAnnouncement() {
   return (
      <Box>
         <NavbarAnnouncement />
         <ListAnnouncement />
      </Box>
   )
}