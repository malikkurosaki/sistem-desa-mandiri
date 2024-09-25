"use client"
import { LayoutNavbarNew, SkeletonList, SkeletonSingle, TEMA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Avatar, Box, Button, Center, Divider, Flex, Grid, Indicator, Input, rem, SimpleGrid, Skeleton, Stack, Text, TextInput } from '@mantine/core';
import { useMediaQuery, useShallowEffect } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiChevronLeft, HiMagnifyingGlass } from 'react-icons/hi2';
import { funGetAllmember, TypeUser } from '@/module/user';
import { funGetUserByCookies } from '@/module/auth';
import toast from 'react-hot-toast';
import { globalMemberDivision } from '../lib/val_division';
import { IoArrowBackOutline, IoClose } from 'react-icons/io5';
import { Carousel } from '@mantine/carousel';
import { FaCheck } from 'react-icons/fa6';


export default function NavbarCreateUsers({ grup, onClose }: { grup?: string, onClose: (val: any) => void }) {
  const router = useRouter()
  const member = useHookstate(globalMemberDivision)
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [dataMember, setDataMember] = useState<TypeUser>([])
  const [loading, setLoading] = useState(true)
  const [onClickSearch, setOnClickSearch] = useState(false)
  const tema = useHookstate(TEMA)
  const isMobile2 = useMediaQuery("(max-width: 438px)");

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

  const handleSearchClick = () => {
    setOnClickSearch(true);
  };

  const handleClose = () => {
    setOnClickSearch(false);
  };

  function handleXMember(id: number) {
    setSelectedFiles(selectedFiles.filter((i: any) => i.idUser != id))
  }

  return (
    <Box>
      <LayoutNavbarNew state={
        <Box>
          <ActionIcon variant="light" onClick={() => { onClose(true) }} bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiChevronLeft size={20} color='white' />
          </ActionIcon>
        </Box>
      } title="Pilih Anggota"
        menu={<ActionIcon onClick={handleSearchClick} variant="light" bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="search">
          <HiMagnifyingGlass size={20} color='white' />
        </ActionIcon>} />
      {/* SEARCH */}
      {onClickSearch
        ? (
          <Box
            pos={'fixed'} top={0} p={rem(20)} w={"100%"} style={{
              maxWidth: rem(550),
              zIndex: 9999,
              backgroundColor: `${tema.get().utama}`,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}>
            <Grid justify='center' align='center' gutter={'lg'}>
              <Grid.Col span={1}>
                <ActionIcon onClick={handleClose} variant="subtle" color='white' size="lg" mt={5} radius="lg" aria-label="search">
                  <IoArrowBackOutline size={30} />
                </ActionIcon>
              </Grid.Col>
              <Grid.Col span={11}>
                <TextInput
                  styles={{
                    input: {
                      color: "white",
                      borderRadius: '#A3A3A3',
                      borderColor: `${tema.get().utama}`,
                      backgroundColor: `${tema.get().utama}`,
                    },
                  }}
                  size="md"
                  radius={30}
                  placeholder="Pencarian"
                  onChange={(e) => loadData(e.target.value)}
                />
              </Grid.Col>
            </Grid>
          </Box>
        )
        : null
      }
      {/* Close User */}
      <Box pos={'fixed'} top={80} pl={rem(20)} pr={rem(20)} pt={rem(20)} pb={rem(5)} w={"100%"} style={{
        maxWidth: rem(550),
        zIndex: 100,
        backgroundColor: `${tema.get().bgUtama}`,
        borderBottom: `1px solid ${"#E0DFDF"}`
      }}>
        {selectedFiles.length > 0 ? (
          <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withControls={false}>
            {selectedFiles.map((v: any, i: any) => {
              return (
                <Carousel.Slide key={i}>
                  <Box w={{
                    base: 70,
                    xl: 70
                  }}
                    onClick={() => { handleXMember(v.idUser) }}
                  >
                    <Center>
                      <Indicator inline size={25} offset={7} position="bottom-end" color="red" withBorder label={<IoClose />}>
                        <Avatar style={{
                          border: `2px solid ${tema.get().utama}`
                        }} src={`https://wibu-storage.wibudev.com/api/files/${v.img}`} alt="it's me" size="lg" />
                      </Indicator>
                    </Center>
                    <Text ta={"center"} lineClamp={1}>{v.name}</Text>
                  </Box>
                </Carousel.Slide>
              )
            })}
          </Carousel>
        ) : (
          <Box h={rem(81)}>
            <Flex justify={"center"} align={'center'} h={"100%"}>
              <Text ta={'center'} fz={14}>Tidak ada anggota yang dipilih</Text>
            </Flex>
          </Box>
        )}
      </Box>
      <Box p={20}>
        <Stack>
          <Box pt={100} mb={100}>
            {loading ?
              Array(6)
                .fill(null)
                .map((_, i) => (
                  <Box key={i}>
                    <SkeletonList />
                  </Box>
                ))
              :
              (dataMember.length === 0) ?
                <Stack align="stretch" justify="center" w={"100%"} h={"60vh"}>
                  <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada anggota</Text>
                </Stack>
                :
                dataMember.map((v, index) => {
                  const isSelected = selectedFiles.some((i: any) => i.idUser == dataMember[index].id);
                  return (
                    <Box mb={10} key={index} onClick={() => handleFileClick(index)}>
                      <Grid align='center'>
                        <Grid.Col
                          span={{
                            base: 1,
                            xs: 1,
                            sm: 1,
                            md: 1,
                            lg: 1,
                            xl: 1,
                          }}
                        >
                          <Avatar src={`https://wibu-storage.wibudev.com/api/files/${v.img}`} alt="it's me" size="lg" />
                        </Grid.Col>
                        <Grid.Col
                          span={{
                            base: 11,
                            xs: 11,
                            sm: 11,
                            md: 11,
                            lg: 11,
                            xl: 11,
                          }}
                        >
                          <Flex justify='space-between' align={"center"}>
                            <Flex direction={'column'} align="flex-start" justify="flex-start">
                              <Text lineClamp={1}  pl={isMobile2 ? 40 : 30}>{v.name}</Text>
                            </Flex>
                            {isSelected ? <FaCheck /> : null}
                          </Flex>
                        </Grid.Col>
                      </Grid>
                      <Box mt={10}>
                        <Divider my={10} />
                      </Box>
                    </Box>
                  );
                })
            }
          </Box>
        </Stack>
      </Box>
      <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
        maxWidth: rem(550),
        zIndex: 999,
        backgroundColor: `${tema.get().bgUtama}`,
      }}>
        <Button
          color="white"
          bg={tema.get().utama}
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

