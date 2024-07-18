"use client"
import { LayoutDrawer, LayoutNavbarNew, WARNA } from '@/module/_global';
import { ActionIcon, Avatar, Box, Button, Divider, Flex, Group, Modal, SimpleGrid, Text, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FaUserTie } from 'react-icons/fa6';
import { HiUserAdd } from 'react-icons/hi';
import { IoIosCloseCircle } from 'react-icons/io';
import { LuClipboardEdit } from 'react-icons/lu';
import { MdAccountCircle } from 'react-icons/md';

const dataUser = [
  {
    id: 1,
    img: "https://i.pravatar.cc/1000?img=3",
    name: "Doni Setiawan",
    role: "Admin"
  },
  {
    id: 2,
    img: "https://i.pravatar.cc/1000?img=10",
    name: "Ilham Udin",
    role: "Anggota"
  },
  {
    id: 3,
    img: "https://i.pravatar.cc/1000?img=11",
    name: "Didin Anang",
    role: "Anggota"
  },
  {
    id: 4,
    img: "https://i.pravatar.cc/1000?img=21",
    name: "Angga Saputra",
    role: "Anggota"
  },
  {
    id: 5,
    img: "https://i.pravatar.cc/1000?img=32",
    name: "Marcel Widianto",
    role: "Anggota"
  },
  {
    id: 6,
    img: "https://i.pravatar.cc/1000?img=37",
    name: "Bagas Nusantara",
    role: "Anggota"
  },
];

export default function InformationDivision() {
  const router = useRouter()
  const [openDrawer, setDrawer] = useState(false)
  return (
    <Box>
      <LayoutNavbarNew back="/division/1" title="divisi kerohanian"
        menu={
          <ActionIcon variant="light" onClick={() => {
            router.push('/division/edit/1')
          }} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
            <LuClipboardEdit size={20} color='white' />
          </ActionIcon>}
      />
      <Box p={20}>
        <Box>
          <Text fw={"bold"}>Deskripsi Divisi</Text>
          <Box p={20} bg={"white"} style={{
            borderRadius: 10,
            border: `1px solid ${WARNA.borderBiruMuda}`,
          }}>
            <Text ta={"justify"}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </Text>
          </Box>
        </Box>
        <Box mt={20}>
          <Box p={20} bg={"white"} style={{
            borderRadius: 10,
            border: `1px solid ${WARNA.borderBiruMuda}`,
          }}>
            <Box>
              <Text>20 Anggota</Text>
            </Box>
            <Box mt={15}>
              <Group align='center' onClick={() => router.push('/division/create-anggota/1')}>
                <Avatar size="lg">
                  <AiOutlineUserAdd size={30} color={WARNA.biruTua} />
                </Avatar>
                <Text>Tambah Anggota</Text>
              </Group>
            </Box>
            <Box pt={10}>
              <Box mb={10}>
                {dataUser.map((v, i) => {
                  return (
                    <Box key={i}>
                      <Flex
                        justify={"space-between"}
                        align={"center"}
                        mt={10}
                        onClick={() => setDrawer(true)}
                      >
                        <Group>
                          <Avatar src={v.img} alt="it's me" size="lg" />
                          <Box>
                            <Text c={WARNA.biruTua} fw={"bold"}>
                              {v.name}
                            </Text>
                          </Box>
                        </Group>
                        <Text c={WARNA.biruTua} fw={"bold"}>
                          {v.role}
                        </Text>
                      </Flex>
                      <Box mt={10}>
                        <Divider size={"xs"} />
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <LayoutDrawer opened={openDrawer} onClose={() => setDrawer(false)} title="">
        <Box>
          <Group align='center' mb={20} onClick={() => setDrawer(false)}>
            <ActionIcon variant="light" size={60} aria-label="admin" radius="xl">
              <FaUserTie size={30} color={WARNA.biruTua} />
            </ActionIcon>
            <Text c={WARNA.biruTua}>Jadikan Admin</Text>
          </Group>
          <Group align='center' onClick={() => setDrawer(false)}>
            <ActionIcon variant="light" size={60} aria-label="admin" radius="xl">
              <IoIosCloseCircle size={40} color={WARNA.biruTua} />
            </ActionIcon>
            <Text c={WARNA.biruTua}>Keluarkan dari Group</Text>
          </Group>
        </Box>
      </LayoutDrawer>
    </Box>
  );
}
