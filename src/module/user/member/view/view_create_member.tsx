import { Box } from "@mantine/core";
import NavbarCreateMember from "../component/ui/navbar_create_member";
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import CreateMember from "../component/create_member";

export default function ViewCreateMember() {
   return (
      <Box>
         {/* <NavbarCreateMember /> */}
         <LayoutNavbarNew back="" title="Tambah Anggota" menu={<></>} />
         <CreateMember/>
      </Box>
   )
}