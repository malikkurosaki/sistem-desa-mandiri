"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Avatar, Box, Button, Center, Input, rem, SimpleGrid, Skeleton, Stack, Text, TextInput } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiChevronLeft, HiMagnifyingGlass } from 'react-icons/hi2';
import { funGetAllmember, TypeUser } from '@/module/user';
import { funGetUserByCookies } from '@/module/auth';
import toast from 'react-hot-toast';
import { globalMemberProject } from '../lib/val_project';


export default function CreateUsersProject({ grup, onClose }: { grup?: string, onClose: (val: any) => void }) {
  const router = useRouter()
  const member = useHookstate(globalMemberProject)
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [dataMember, setDataMember] = useState<TypeUser>([])
  const [loading, setLoading] = useState(true)
  const [openTugas, setOpenTugas] = useState(false)

  const handleFileClick = (index: number) => {
    if (selectedFiles.some((i: any) => i.idUser == dataMember[index].id)) {
      setSelectedFiles(selectedFiles.filter((i: any) => i.idUser != dataMember[index].id))
    } else {
      setSelectedFiles([...selectedFiles, { idUser: dataMember[index].id, name: dataMember[index].name, img: dataMember[index].img }])
    }
  };


  async function loadData(search: string) {
    setLoading(true)
    const res = await funGetAllmember('?active=true&group=' + grup + '&search=' + search);
    const user = await funGetUserByCookies();

    if (res.success) {
      setDataMember(res.data.filter((i: any) => i.id != user.id))

      // cek data member sebelumnya
      if (member.length > 0) {
        setSelectedFiles(JSON.parse(JSON.stringify(member.get())))
      }
    } else {
      toast.error(res.message)
    }
    setLoading(false)
  }


  function onSubmit() {
    if (selectedFiles.length == 0) {
      return toast.error("Error! silahkan pilih anggota")
    }
    member.set(selectedFiles)
    onClose(true)
  }

  useShallowEffect(() => {
    loadData("")
  }, []);

  return (
    <Box>
      <LayoutNavbarNew state={
        <Box>
          <ActionIcon variant="light" onClick={() => { onClose(true) }} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiChevronLeft size={20} color='white' />
          </ActionIcon>
        </Box>
      } title="Pilih Anggota" menu />
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
            onChange={(e) => loadData(e.target.value)}
          />
          <Box pt={10} mb={100}>
            {loading ?
              <SimpleGrid
                cols={{ base: 2, sm: 2, lg: 2 }}
                spacing={{ base: 20, sm: "xl" }}
                verticalSpacing={{ base: "md", sm: "xl" }}
              >
                {Array(6)
                  .fill(null)
                  .map((_, i) => (
                    <Box key={i}>
                      <Skeleton width={"100%"} height={150} radius={20} />
                    </Box>
                  ))}
              </SimpleGrid>
              :
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
                          <Avatar src={`/api/file/img?jenis=image&cat=user&file=${v.img}`} alt="it's me" size="xl" />
                        </Center>
                        <Text mt={20} ta="center" lineClamp={1}>
                          {v.name}
                        </Text>
                      </Box>
                    </Box>
                  );
                })}
              </SimpleGrid>
            }
          </Box>
        </Stack>
      </Box>
      <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
        maxWidth: rem(550),
        zIndex: 999,
        backgroundColor: `${WARNA.bgWhite}`,
      }}>
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
  );
}

