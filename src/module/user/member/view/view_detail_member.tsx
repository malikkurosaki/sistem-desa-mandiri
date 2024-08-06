import {  Box, Group, Text } from "@mantine/core";
import { FaSquarePhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiIdCardFill } from "react-icons/ri";
import NavbarDetailMember from "../component/ui/navbar_detail_member";
import { IoMaleFemale } from "react-icons/io5";

export default function ViewDetailMember({ data }: { data: string }) {
   return (
      <Box>
         <NavbarDetailMember id={data} />
      </Box>
   )
}