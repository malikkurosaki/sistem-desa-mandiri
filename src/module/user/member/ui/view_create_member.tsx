import { Box } from "@mantine/core";
import NavbarCreateMember from "./navbar_create_member";
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import CreateMember from "./create_member";

export default function ViewCreateMember() {
   return (
      <Box>
         {/* <NavbarCreateMember /> */}
         <LayoutNavbarNew back="" title="Tambah Anggota" menu={<></>} />
         <CreateMember />
      </Box>
   )
}