import { Box } from "@mantine/core";
import NavbarListMember from "../component/ui/navbar_list_member";
import ListMember from "../component/list_member";

export default function ViewListMember() {
   return (
      <Box>
         <NavbarListMember />
         <ListMember />
      </Box>
   )
}