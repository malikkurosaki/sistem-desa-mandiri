import { LayoutIconBack, LayoutNavbarHome, WARNA } from "@/module/_global";
import { ActionIcon, Anchor, Box, Button, Flex, Group, Stack, Text } from "@mantine/core";
import { BsInfo } from "react-icons/bs";
import { HiUser } from "react-icons/hi2";
import { RiIdCardFill } from "react-icons/ri";
import { FaSquarePhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { InfoTitleProfile } from "../component/ui/ui_profile";

export default function ViewProfile() {
   return (
      <>
         <LayoutNavbarHome>
            <Group justify="space-between">
               <LayoutIconBack />
               <ActionIcon variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Info">
                  <BsInfo size={20} color='white' />
               </ActionIcon>
            </Group>
            <Stack
               align="center"
               justify="center"
               gap="xs"
            >
               <HiUser size={100} color='white' />
               <Text c={'white'} fw={'bold'} fz={25}>Fibra Marcell</Text>
               <Text c={'white'} fw={'lighter'} fz={15}>Kepala Urusan Pengembangan</Text>
            </Stack>
         </LayoutNavbarHome>
         <Box p={20}>
            <InfoTitleProfile />
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
      </>
   )
}