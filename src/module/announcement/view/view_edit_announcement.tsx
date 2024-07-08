import { Box, Button, Stack, Textarea, TextInput } from "@mantine/core";
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import { HiOutlineChevronRight } from "react-icons/hi2";
import EditAnnouncement from "../component/edit_announcement";

export default function ViewEditAnnouncement({ data }: { data: string }) {
   return (
      <Box>
         {/* <NavbarEditAnnouncement /> */}
         <LayoutNavbarNew back="" title="Edit Pengumuman" menu={<></>} />
         <EditAnnouncement />
      </Box>
   )
}