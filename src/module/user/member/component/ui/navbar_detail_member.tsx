'use client'
import { LayoutNavbarHome, LayoutIconBack, WARNA, LayoutDrawer } from "@/module/_global";
import { Box, Group, ActionIcon, Stack, Text } from "@mantine/core";
import { HiMenu } from "react-icons/hi";
import { HiUser } from "react-icons/hi2";
import DrawerDetailMember from "./drawer_detail_member";
import { useState } from "react";

export default function NavbarDetailMember() {
   const [isOpen, setOpen] = useState(false)
   return (
      <Box>
         <LayoutNavbarHome>
            <Group justify="space-between">
               <LayoutIconBack />
               <ActionIcon onClick={() => setOpen(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Info">
                  <HiMenu size={20} color='white' />
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
         <LayoutDrawer opened={isOpen} title={'Menu'} onClose={() => setOpen(false)}>
            <DrawerDetailMember onDeleted={() => setOpen(false)} />
         </LayoutDrawer>
      </Box>
   )
} 