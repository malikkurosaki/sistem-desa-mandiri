"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { Avatar, Box, Button, Divider, Group, Stack, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const dataUser = [
  {
    id: 1,
    img: "https://i.pravatar.cc/1000?img=3",
    name: "Doni Setiawan",
  },
  {
    id: 2,
    img: "https://i.pravatar.cc/1000?img=10",
    name: "Ilham Udin",
  },
  {
    id: 3,
    img: "https://i.pravatar.cc/1000?img=11",
    name: "Didin Anang",
  },
  {
    id: 4,
    img: "https://i.pravatar.cc/1000?img=21",
    name: "Angga Saputra",
  },
  {
    id: 5,
    img: "https://i.pravatar.cc/1000?img=32",
    name: "Marcel Widianto",
  },
  {
    id: 6,
    img: "https://i.pravatar.cc/1000?img=37",
    name: "Bagas Nusantara",
  },
];

export default function ViewCreateAnggotaDivision() {
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
      <LayoutNavbarNew back="/division/info/1" title="tambah anggota"
        menu
      />
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
        </Stack>
        <Box mt={20}>
          {dataUser.map((v, index) => {
            const isSelected = selectedFiles[index];
            return (
              <Box my={10} key={index} onClick={() => handleFileClick(index)}>
                <Group justify='space-between' align='center'>
                  <Group>
                    <Avatar src={v.img} alt="it's me" size="lg" />
                    <Text>{v.name}</Text>
                  </Group>
                  {isSelected ? <FaCheck /> : null}
                </Group>
                <Box mt={10}>
                  <Divider size={"xs"} />
                </Box>
              </Box>
            )
          })}
        </Box>
        <Box mt="xl">
          <Button
            color="white"
            bg={WARNA.biruTua}
            size="lg"
            radius={30}
            fullWidth
            onClick={() => router.push("/division/info/1")}
          >
            Simpan
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

