"use client"
import { LayoutNavbarNew, SkeletonSingle, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Avatar, Box, Button, Center, Divider, Flex, Grid, Indicator, Input, rem, SimpleGrid, Skeleton, Stack, Text, TextInput } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
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
          <ActionIcon variant="light" onClick={() => { onClose(true) }} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiChevronLeft size={20} color='white' />
          </ActionIcon>
        </Box>
      } title="Pilih Anggota"
        menu={<ActionIcon onClick={handleSearchClick} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="search">
          <HiMagnifyingGlass size={20} color='white' />
        </ActionIcon>} />
        {/* SEARCH */}
        {onClickSearch
          ? (
            <Box
              pos={'fixed'} top={0} p={rem(20)} w={"100%"} style={{
                maxWidth: rem(550),
                zIndex: 9999,
                backgroundColor: `${WARNA.biruTua}`,
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
                        borderColor: `${WARNA.biruTua}`,
                        backgroundColor: `${WARNA.biruTua}`,
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
          backgroundColor: `${WARNA.bgWhite}`,
          borderBottom: `1px solid ${"#E0DFDF"}`
        }}>
          {selectedFiles.length > 0 ? (
            <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withIndicators withControls={false}>
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
                            border: `2px solid ${WARNA.biruTua}`
                          }} src={`/api/file/img?jenis=image&cat=user&file=${v.img}`} alt="it's me" size="lg" />
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
                  <SkeletonSingle />
                </Box>
              ))
              : dataMember.map((v, index) => {
                const isSelected = selectedFiles.some((i: any) => i.idUser == dataMember[index].id);
                return (
                  <Box mb={15} key={index} onClick={() => handleFileClick(index)}>
                    <Grid align='center'>
                      <Grid.Col span={{
                        base: 3,
                        xl: 2
                      }}>
                        <Avatar src={`/api/file/img?jenis=image&cat=user&file=${v.img}`} alt="it's me" size="lg" />
                      </Grid.Col>
                      <Grid.Col span={{
                        base: 9,
                        xl: 10
                      }}>
                        <Flex justify='space-between' align={"center"}>
                          <Flex direction={'column'} align="flex-start" justify="flex-start">
                            <Text lineClamp={1}>{v.name}</Text>
                          </Flex>
                          {isSelected ? <FaCheck /> : null}
                        </Flex>
                      </Grid.Col>
                    </Grid>
                    <Box mt={10}>
                      <Divider size={"xs"} />
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

