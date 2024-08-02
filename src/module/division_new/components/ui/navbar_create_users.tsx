"use client"
import { API_ADDRESS, LayoutNavbarNew, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { Avatar, Box, Button, Center, Input, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { globalMemberDivision } from '../../lib/val_division';
import { TypeUser } from '@/module/user';
import { funGetUserByCookies } from '@/module/auth';

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


export default function NavbarCreateUsers({ grup, onClose }: { grup?: string, onClose: (val: any) => void }) {
  const router = useRouter()
  const [selectedFiles, setSelectedFiles] = useState<Record<number, boolean>>({});
  const member = useHookstate(globalMemberDivision)
  const [dataMember, setDataMember] = useState<TypeUser>([])

  const handleFileClick = (index: number) => {
    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [index]: !prevSelectedFiles[index],
    }));
  };

  async function loadData() {
    const loadMember = await fetch(API_ADDRESS.apiGetAllUser + '&active=true&groupID=' + grup);
    const user = await funGetUserByCookies();
    const hasil = await loadMember.json()
    setDataMember(hasil.filter((i: any) => i.id != user.id))
  }

  useShallowEffect(() => {
    loadData()
  }, []);

  return (
    <Box>
      <LayoutNavbarNew title="Pilih Anggota" menu />
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
              {dataMember.map((v, index) => {
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
                        <Avatar src={"https://i.pravatar.cc/1000?img=37"} alt="it's me" size="xl" />
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
            onClick={() => { onClose(true) }}
          >
            Simpan
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

