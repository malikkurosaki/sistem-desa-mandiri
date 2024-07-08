'use client'
import { isDrawer, LayoutDrawer, LayoutIconBack, LayoutNavbarHome, WARNA } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import { ActionIcon, Box, Grid, Group, Text } from "@mantine/core";
import { HiMenu } from "react-icons/hi";
import DrawerListMember from "./drawer_list_member";

export default function NavbarListMember() {
   const openDrawer = useHookstate(isDrawer)
   return (
      <>
         <LayoutNavbarHome>
            <Grid justify='center' align='center'>
               <Grid.Col span="auto">
                  <LayoutIconBack back='/home' />
               </Grid.Col>
               <Grid.Col span={6}>
                  <Text ta={'center'} fw={'bold'} c={'white'}>ANGGOTA</Text>
               </Grid.Col>
               <Grid.Col span="auto">
                  <Group justify='flex-end'>
                     <ActionIcon onClick={() => openDrawer.set(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
                        <HiMenu size={20} color='white' />
                     </ActionIcon>
                  </Group>
               </Grid.Col>
            </Grid>
         </LayoutNavbarHome>
         <LayoutDrawer opened={openDrawer.get()} title={'MENU'} onClose={() => openDrawer.set(false)}>
            <DrawerListMember />
         </LayoutDrawer>
      </>
   )
}