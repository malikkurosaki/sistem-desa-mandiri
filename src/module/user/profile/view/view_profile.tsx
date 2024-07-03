import { LayoutNavbarHome, WARNA } from "@/module/_global";
import { ActionIcon, Group, Stack, Text } from "@mantine/core";
import { BsInfo } from "react-icons/bs";
import { HiUser } from "react-icons/hi2";

export default function ViewProfile() {
   return (
      <>
         <LayoutNavbarHome>
            <Group justify="space-between">
               <Text fw={'bold'} c={'white'}>Profile</Text>
               <ActionIcon variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Info">
                  <BsInfo size={20} color='white' />
               </ActionIcon>
            </Group>
            <Stack
               align="center"
               justify="center"
               gap="xs"
            >

               <HiUser size={150} color='white' />
               <Text c={'white'} fw={'bold'} fz={25}>Fibra Marcell</Text>
               <Text c={'white'} fw={'lighter'} fz={15}>Kepala Urusan Pengembangan</Text>
            </Stack>
         </LayoutNavbarHome>
      </>
   )
}