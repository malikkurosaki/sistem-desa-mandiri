import {  Box, Group, Text } from "@mantine/core";
import { FaSquarePhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiIdCardFill } from "react-icons/ri";
import NavbarDetailMember from "../component/ui/navbar_detail_member";

export default function ViewDetailMember({ data }: { data: string }) {
   return (
      <Box>
         <NavbarDetailMember />
         <Box p={20}>
            <Group justify="space-between" grow py={5}>
               <Group>
                  <RiIdCardFill size={28} />
                  <Text fz={18}>NIK</Text>
               </Group>
               <Text fz={18} fw={'bold'} ta={"right"}>513177782899</Text>
            </Group>
            <Group justify="space-between" grow py={5}>
               <Group>
                  <FaSquarePhone size={28} />
                  <Text fz={18}>NoTelepon</Text>
               </Group>
               <Text fz={18} fw={'bold'} ta={"right"}>+62038939293</Text>
            </Group>
            <Group justify="space-between" grow py={5}>
               <Group>
                  <MdEmail size={28} />
                  <Text fz={18}>Email</Text>
               </Group>
               <Text fz={18} fw={'bold'} ta={"right"}>marcel@gmail.com</Text>
            </Group>
         </Box>
      </Box>
   )
}