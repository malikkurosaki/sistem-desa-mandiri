import { LayoutNavbarNew, WARNA } from "@/module/_global";
import { Box } from "@mantine/core";
import CreateAnnouncement from "../component/create_announcement";

export default function ViewCreateAnnouncement() {
   return (
      <Box>
         <LayoutNavbarNew back="" title="Tambah Pengumuman" menu={<></>} />
         <CreateAnnouncement />
      </Box>
   )
}