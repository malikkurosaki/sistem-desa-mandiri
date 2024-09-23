"use client"
import { globalRole, LayoutDrawer, LayoutNavbarNew, TEMA } from '@/module/_global';
import { ActionIcon, Box, Button, Flex, rem } from '@mantine/core';
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
  const tema = useHookstate(TEMA)

  const dataStatus = [
    {
      id: "0",
      title: "Segera",
      icon: <RiProgress3Line style={iconStyle} />
    },
    {
      id: "1",
      title: "Dikerjakan",
      icon: <TbClockPause style={iconStyle} />
    },
    {
      id: "2",
      title: "Selesai",
      icon: <IoIosCheckmarkCircleOutline style={iconStyle} />
    },
    {
      id: "3",
      title: "Batal",
      icon: <IoCloseCircleOutline style={iconStyle} />
    }
  ]

  return (
    <Box>
      <LayoutNavbarNew back='/home' title='Kegiatan'
        menu={(roleLogin.get() != "user" && roleLogin.get() != "coadmin") ?
          <ActionIcon variant="light" onClick={() => setOpenDrawer(true)} bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiMenu size={20} color='white' />
          </ActionIcon>
          : <></>
        } />

      <Box p={20}>
        <Box
          style={{
            display: "flex",
            gap: "20px",
            position: "relative",
            overflowX: "scroll",
            scrollbarWidth: "none",
            maxWidth: "550px"
          }}
        >
          <Flex gap={"md"} justify={"space-between"}>
            {dataStatus.map((item, index) => (
              <Button
                variant="subtle"
                color={
                  status == item.id
                    ? "white"
                    : tema.get().utama
                }
                key={index}
                onClick={() => { router.push("?status=" + item.id + "&group=" + group) }}
                defaultValue={(status == "1" || status == "2" || status == "3") ? status : "0"}
                radius={"xl"}
                bg={
                  status == item.id
                    ? tema.get().utama
                    : "transparent"
                }
                leftSection={item.icon}
              >
                {item.title}
              </Button>
            ))}
          </Flex>
        </Box>
        <ListProject />

      </Box>

      <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
        <MenuDrawerProject />
      </LayoutDrawer>
    </Box>
  );
}
