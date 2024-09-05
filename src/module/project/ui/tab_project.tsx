"use client"
import { globalRole, LayoutDrawer, LayoutNavbarNew, WARNA } from '@/module/_global';
import { ActionIcon, Box, rem, Tabs } from '@mantine/core';
import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { RiProgress3Line } from "react-icons/ri";
import { useRouter, useSearchParams } from 'next/navigation';
import { TbClockPause } from 'react-icons/tb';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { IoCloseCircleOutline } from 'react-icons/io5';
import ListProject from './list_project';
import MenuDrawerProject from './menu_drawer_project';
import { useHookstate } from '@hookstate/core';

export default function TabProject() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const group = searchParams.get("group");
  const iconStyle = { width: rem(20), height: rem(20) };
  const roleLogin = useHookstate(globalRole)

  return (
    <Box>
      <LayoutNavbarNew back='/home' title='Kegiatan'
        menu={(roleLogin.get() != "user"  && roleLogin.get() != "coadmin") ?
          <ActionIcon variant="light" onClick={() => setOpenDrawer(true)} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiMenu size={20} color='white' />
          </ActionIcon>
          : <></>
        } />

      <Box p={20}>
        <Tabs variant="pills" radius="xl" defaultValue={(status == "1" || status == "2" || status == "3") ? status : "0"}>
          <Tabs.List grow justify='center'>
            <Tabs.Tab value="0" w={"23%"}
              leftSection={<TbClockPause style={iconStyle} />}
              onClick={() => { router.push("?status=0&group=" + group) }}
              color={WARNA.biruTua}
            >
              Segera
            </Tabs.Tab>
            <Tabs.Tab value="1" w={"28%"}
              leftSection={<RiProgress3Line style={iconStyle} />}
              onClick={() => { router.push("?status=1&group=" + group) }}
              color={WARNA.biruTua}
            >
              Dikerjakan
            </Tabs.Tab>
            <Tabs.Tab value="2" w={"23%"}
              leftSection={<IoIosCheckmarkCircleOutline style={iconStyle} />}
              onClick={() => { router.push("?status=2&group=" + group) }}
              color={WARNA.biruTua}>
              Selesai
            </Tabs.Tab>
            <Tabs.Tab value="3" w={"20%"}
              leftSection={<IoCloseCircleOutline style={iconStyle} />}
              onClick={() => { router.push("?status=3&group=" + group) }}
              color={WARNA.biruTua}>
              Batal
            </Tabs.Tab>
          </Tabs.List>
          <ListProject />
        </Tabs>
      </Box>

      <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
        <MenuDrawerProject />
      </LayoutDrawer>
    </Box>
  );
}
