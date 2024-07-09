import { Box } from "@mantine/core";
import { LayoutNavbarNew } from "@/module/_global";
import EditAnnouncement from "../component/edit_announcement";

export default function ViewEditAnnouncement({ data }: { data: string }) {
   return (
      <Box>
         <LayoutNavbarNew back="" title="Edit Pengumuman" menu={<></>} />
         <EditAnnouncement />
      </Box>
   )
}