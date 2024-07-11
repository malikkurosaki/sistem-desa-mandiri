"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { Avatar, Box, Button, Checkbox, Divider, Flex, Group, Stack, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
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

export default function NavbarAdminDivision() {
  const router = useRouter()
  return (
    <Box>
      <LayoutNavbarNew back="/division/create" title="Pilih Anggota" menu />
      <Box p={20}>
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
        <Box pt={20}>
          {dataUser.map((v, i) => {
            return (
              <Box key={i}>
                <Flex
                  justify={"space-between"}
                  align={"center"}
                >
                  <Group>
                    <Avatar src={v.img} alt="it's me" size="lg" />
                    <Box>
                      <Text c={WARNA.biruTua} fw={"bold"}>
                        {v.name}
                      </Text>
                    </Box>
                  </Group>
                  <Checkbox />
                </Flex>
                <Divider my={20} />
              </Box>
            );
          })}
        </Box>
        <Box mt="xl">
          <Button
            color="white"
            bg={WARNA.biruTua}
            size="lg"
            radius={30}
            fullWidth
            onClick={() => router.push("/division")}
          >
            Simpan
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
