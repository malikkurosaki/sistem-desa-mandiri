"use client"
import { API_ADDRESS, LayoutNavbarNew, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { Avatar, Box, Button, Center, Input, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { TypeUser } from '@/module/user';
import { funGetUserByCookies } from '@/module/auth';
import toast from 'react-hot-toast';
import { globalMemberDivision } from '../lib/val_division';


export default function NavbarCreateUsers({ grup, onClose }: { grup?: string, onClose: (val: any) => void }) {
  const router = useRouter()
  const member = useHookstate(globalMemberDivision)
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [dataMember, setDataMember] = useState<TypeUser>([])

  const handleFileClick = (index: number) => {
    if (selectedFiles.some((i: any) => i.id == dataMember[index].id)) {
      setSelectedFiles(selectedFiles.filter((i: any) => i.id != dataMember[index].id))
    } else {
      setSelectedFiles([...selectedFiles, {idUser: dataMember[index].id, name: dataMember[index].name}])
    }
  };


  async function loadData() {
    const loadMember = await fetch(API_ADDRESS.apiGetAllUser + '&active=true&groupID=' + grup);
    const user = await funGetUserByCookies();
    const hasil = await loadMember.json()
    setDataMember(hasil.filter((i: any) => i.id != user.id))

    // cek data member sebelumnya
    if (member.length > 0) {
      setSelectedFiles(JSON.parse(JSON.stringify(member.get())))
    }
  }


  function onSubmit() {
    if (selectedFiles.length == 0) {
      return toast.error("Error! silahkan pilih anggota")
    }
    member.set(selectedFiles)
    onClose(true)
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
                const isSelected = selectedFiles.some((i: any) => i.idUser == dataMember[index].id);
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
            onClick={() => { onSubmit() }}
          >
            Simpan
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

