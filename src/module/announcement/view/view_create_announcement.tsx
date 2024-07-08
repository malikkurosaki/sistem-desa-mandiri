import { LayoutNavbarNew, WARNA } from "@/module/_global";
import { Box, Stack, TextInput, Button, Textarea } from "@mantine/core";
import { HiOutlineChevronRight, HiUser } from "react-icons/hi2";
import CreateAnnouncement from "../component/create_announcement";

export default function ViewCreateAnnouncement() {
   return (
      <Box>
         {/* <NavbarCreateAnnouncement /> */}
         <LayoutNavbarNew back="" title="Tambah Pengumuman" menu={<></>} />
         <CreateAnnouncement/>
      </Box>
   )
}