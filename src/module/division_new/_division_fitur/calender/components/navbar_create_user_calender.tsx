'use client'
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { Avatar, Box, Button, Center, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { HiMagnifyingGlass } from 'react-icons/hi2';


const dataUser = [
  {
    id: 1,
    img: "https://i.pravatar.cc/500?img=3",
    name: "Doni Setiawan",
  },
  {
    id: 2,
    img: "https://i.pravatar.cc/500?img=10",
    name: "Ilham Udin",
  },
  {
    id: 3,
    img: "https://i.pravatar.cc/500?img=11",
    name: "Didin Anang",
  },
  {
    id: 4,
    img: "https://i.pravatar.cc/500?img=1",
    name: "Angga Saputra",
  },
  {
    id: 5,
    img: "https://i.pravatar.cc/500?img=2",
    name: "Marcel Widianto",
  },
  {
    id: 6,
    img: "https://i.pravatar.cc/500?img=7",
    name: "Bagas Nusantara",
  },
];

export default function NavbarCreateUserCalender() {
  const router = useRouter()
  const [selectedFiles, setSelectedFiles] = useState<Record<number, boolean>>({});

  const handleFileClick = (index: number) => {
    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [index]: !prevSelectedFiles[index],
    }));
  };
  return (
    <Box>
      <LayoutNavbarNew back="/calender/create" title="Tambah Anggota" menu />
      <Box p={20}>
        <Stack>
          <TextInput
            styles={{
              input: {
                color: WARNA.biruTua,
                borderRadius: '#A3A3A3',
                borderColor: '#A3A3A3',
              },
            }}
            size="md"
            radius={30}
            leftSection={<HiMagnifyingGlass size={20} />}
            placeholder="Pencarian"
          />
          <Box pt={10}>
            <SimpleGrid
              cols={{ base: 2, sm: 2, lg: 2 }}
              spacing={{ base: 20, sm: "xl" }}
              verticalSpacing={{ base: "md", sm: "xl" }}
            >
              {dataUser.map((v, index) => {
                const isSelected = selectedFiles[index];
                return (
                  <Box key={index} mb={10}>
                    <Box
                      bg={isSelected ? WARNA.bgHijauMuda : "white"}
                      style={{
                        border: `1px solid ${WARNA.biruTua}`,
                        borderRadius: 20,
                      }}
                      py={10}
                      onClick={() => handleFileClick(index)}
                    >
                      <Center>
                        <Avatar src={v.img} alt="it's me" size="xl" />
                      </Center>
                      <Text mt={20} ta="center">
                        {v.name}
                      </Text>
                    </Box>
                  </Box>
                );
              })}
            </SimpleGrid>
          </Box>
        </Stack>
        <Box mt="xl">
          <Button
            color="white"
            bg={WARNA.biruTua}
            size="lg"
            radius={30}
            fullWidth
            onClick={() => router.push("/calender/create")}
          >
            Simpan
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
