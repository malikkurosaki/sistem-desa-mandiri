import { Box } from "@mantine/core";
import NavbarListMember from "./navbar_list_member";
import ListMember from "./list_member";

export default function ViewListMember() {
   return (
      <Box>
         <NavbarListMember />
         <ListMember />
      </Box>
   )
}