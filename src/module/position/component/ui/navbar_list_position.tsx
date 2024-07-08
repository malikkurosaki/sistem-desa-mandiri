'use client'
import { LayoutNavbarHome, LayoutIconBack, WARNA, LayoutDrawer, isDrawer } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import { Grid, Group, ActionIcon, Box, Text } from "@mantine/core";
import { HiMenu } from "react-icons/hi";
import DrawerListPosition from "./drawer_list_position";

export default function NavbarListPosition() {
   const openDrawerMenu = useHookstate(isDrawer)
   return (
      <Box>
         <LayoutNavbarHome>
            <Grid justify='center' align='center'>
               <Grid.Col span="auto">
                  <LayoutIconBack back='/home' />
               </Grid.Col>
               <Grid.Col span={6}>
                  <Text ta={'center'} fw={'bold'} c={'white'}>Jabatan</Text>
               </Grid.Col>
               <Grid.Col span="auto">
                  <Group justify='flex-end'>
                     <ActionIcon onClick={() => openDrawerMenu.set(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
                        <HiMenu size={20} color='white' />
                     </ActionIcon>
                  </Group>
               </Grid.Col>
            </Grid>
         </LayoutNavbarHome>
         <LayoutDrawer opened={openDrawerMenu.get()} title={'MENU'} onClose={() => openDrawerMenu.set(false)}>
            <DrawerListPosition />
         </LayoutDrawer>
      </Box>
   );
}