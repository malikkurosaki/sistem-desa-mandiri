"use client"
import { globalRole, LayoutDrawer, LayoutNavbarNew, WARNA } from '@/module/_global';
import { ActionIcon, Box, Button, Flex, Group, Indicator, Progress, rem, SimpleGrid, Tabs } from '@mantine/core';
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
import { Carousel } from '@mantine/carousel';

export default function TabProject() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const group = searchParams.get("group");
  const iconStyle = { width: rem(20), height: rem(20) };
  const roleLogin = useHookstate(globalRole)

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
          <ActionIcon variant="light" onClick={() => setOpenDrawer(true)} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiMenu size={20} color='white' />
          </ActionIcon>
          : <></>
        } />

      <Box p={20}>
        <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withIndicators withControls={false}>
          {dataStatus.map((item, index) => (
            <Carousel.Slide key={index}>
              <Button
                variant="subtle"
                color={
                  status == item.id
                    ? "white"
                    : WARNA.biruTua
                }
                onClick={() => { router.push("?status=" + item.id + "&group=" + group) }}
                defaultValue={(status == "1" || status == "2" || status == "3") ? status : "0"}
                radius={"xl"}
                bg={
                  status == item.id
                    ? WARNA.biruTua
                    : "transparent"
                }
              >
                {item.icon}
                <Box ml={10}>{item.title}</Box>
              </Button>
            </Carousel.Slide>
          ))}
        </Carousel>
        {/* <Flex justify={"center"} gap={'sm'} align={'center'} mt={10}>
          {dataStatus.map((v, i) => (
            <Box key={i}>
              <Box w={6} h={6} bg={
                status == v.id
                  ? WARNA.biruTua
                  : "#B0AEAE"
              } style={{
                borderRadius: 100
              }} />
            </Box>
          ))}
        </Flex> */}
        <ListProject />
        {/* <Tabs variant="pills" radius="md" defaultValue={(status == "1" || status == "2" || status == "3") ? status : "0"}>
          <SimpleGrid
            cols={{ base: 2, sm: 2, lg: 4 }}
          >
            <Tabs.Tab value="0"
              leftSection={<TbClockPause style={iconStyle} />}
              onClick={() => { router.push("?status=0&group=" + group) }}
              color={WARNA.biruTua}
            >
              Segera
            </Tabs.Tab>
            <Tabs.Tab value="1"
              leftSection={<RiProgress3Line style={iconStyle} />}
              onClick={() => { router.push("?status=1&group=" + group) }}
              color={WARNA.biruTua}
            >
              Dikerjakan
            </Tabs.Tab>
            <Tabs.Tab value="2"
              leftSection={<IoIosCheckmarkCircleOutline style={iconStyle} />}
              onClick={() => { router.push("?status=2&group=" + group) }}
              color={WARNA.biruTua}>
              Selesai
            </Tabs.Tab>
            <Tabs.Tab value="3"
              leftSection={<IoCloseCircleOutline style={iconStyle} />}
              onClick={() => { router.push("?status=3&group=" + group) }}
              color={WARNA.biruTua}>
              Batal
            </Tabs.Tab>
          </SimpleGrid>
          <ListProject />
        </Tabs> */}
        {/* <Tabs variant="pills" radius="xl" defaultValue={(status == "1" || status == "2" || status == "3") ? status : "0"}>
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
        </Tabs> */}

      </Box>

      <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
        <MenuDrawerProject />
      </LayoutDrawer>
    </Box>
  );
}
