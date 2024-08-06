import { LayoutNavbarHome, LayoutNavbarNew, WARNA } from "@/module/_global";
import { Box, Stack, TextInput, Button } from "@mantine/core";
import { HiUser } from "react-icons/hi2";
import NavbarEditMember from "../component/ui/navbar_edit_member";
import EditMember from "../component/edit_member";

export default function ViewEditMember({data}: {data: string}) {
   return (
      <Box>
         <LayoutNavbarNew back="" title="Edit Anggota" menu={<></>} />
         <EditMember id={data} />
      </Box>
   )
}