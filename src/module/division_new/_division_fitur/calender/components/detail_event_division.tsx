'use client'
import { LayoutDrawer, LayoutNavbarNew, WARNA } from '@/module/_global';
import { ActionIcon, Avatar, Box, CopyButton, Flex, Group, Stack, Text, Tooltip } from '@mantine/core';
import React, { useState } from 'react';
import { BsCalendar2Event, BsCalendarDate } from 'react-icons/bs';
import { MdEventNote, MdOutlineFormatListBulleted } from "react-icons/md";
import { LuClock, LuCopy, LuLink } from "react-icons/lu";
import { FaCheck } from 'react-icons/fa6';
import { TbCopy } from 'react-icons/tb';
import { HiMenu } from 'react-icons/hi';
import DrawerDetailEvent from './drawer_detail_event';
const dataAnggota = [
  {
    id: 1,
    name: "Iqbal Ramadan",
    image: "https://i.pravatar.cc/1000?img=5",
    email: "iqbal.ramadan@gmail.com",
  },
  {
    id: 2,
    name: "Doni Setiawan",
    image: "https://i.pravatar.cc/1000?img=10",
    email: "doni.setiawan@gmail.com",
  },
  {
    id: 3,
    name: "Rangga Agung",
    image: "https://i.pravatar.cc/1000?img=51",
    email: "rangga.agung@gmail.com",
  },
  {
    id: 4,
    name: "Ramadan Sananta",
    image: "https://i.pravatar.cc/1000?img=15",
    email: "ramadan@gmail.com",
  },
  {
    id: 5,
    name: "Imam Baroni",
    image: "https://i.pravatar.cc/1000?img=22",
    email: "imam.baroni@gmail.com",
  },
];

export default function DetailEventDivision() {
  const [openDrawer, setOpenDrawer] = useState(false)
  return (
    <Box>
      <LayoutNavbarNew back="/calender" title="Detail Event"
        menu={<ActionIcon variant="light" onClick={() => setOpenDrawer(true)} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
          <HiMenu size={20} color='white' />
        </ActionIcon>} />
      <Box p={20}>
        <Box style={{
          border: `1px solid ${"#D8D8F1"}`,
          padding: 20,
          borderRadius: 10
        }}>
          <Stack ml={10}>
            <Group mb={10} gap={30}>
              <BsCalendar2Event size={25} color={WARNA.biruTua} />
              <Text>Pembahasan mengenai Darmasaba</Text>
            </Group>
            <Group mb={10} gap={30}>
              <BsCalendarDate size={25} color={WARNA.biruTua} />
              <Text>Senin, 24 Juni 2024</Text>
            </Group>
            <Group mb={10} gap={30}>
              <LuClock size={25} color={WARNA.biruTua} />
              <Text>10:00  | 11:00 </Text>
            </Group>
            <Group mb={10} gap={30}>
              <BsCalendarDate size={25} color={WARNA.biruTua} />
              <Text>Acara 1 Kali</Text>
            </Group>
            <Group mb={10} gap={30}>
              <LuLink size={25} color={WARNA.biruTua} />
              <Group justify='space-between'>
                <Text>http://Linkmeet.com</Text>
                <CopyButton value="http://Linkmeet.com" timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                      <ActionIcon color={copied ? 'teal' : WARNA.biruTua} variant="subtle" onClick={copy}>
                        {copied ? (
                          <FaCheck size={20} />
                        ) : (
                          <TbCopy size={20} />
                        )}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </Group>
            </Group>
            <Group gap={30}>
              <MdOutlineFormatListBulleted size={25} color={WARNA.biruTua} />
              <Text>Dimohon agar tepat waktu</Text>
            </Group>
          </Stack>
        </Box>
        <Box pt={20}>
          <Box mb={20}>
            <Box
              style={{
                border: `1px solid ${"#C7D6E8"}`,
                borderRadius: 10,
              }}
              px={20}
              pt={20}
            >
              {dataAnggota.map((v, i) => {
                return (
                  <Flex
                    justify={"space-between"}
                    align={"center"}
                    mb={20}
                    key={i}
                  >
                    <Group>
                      <Avatar src={v.image} alt="it's me" size="lg" />
                      <Box>
                        <Text c={WARNA.biruTua} fw={"bold"}>
                          {v.name}
                        </Text>
                        <Text c={"#5A687D"} fz={14}>
                          {v.email}
                        </Text>
                      </Box>
                    </Group>
                    <Text c={WARNA.biruTua} fw={"bold"}>
                      Anggota
                    </Text>
                  </Flex>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
      <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
       <DrawerDetailEvent/>
      </LayoutDrawer>
    </Box>
  );
}

