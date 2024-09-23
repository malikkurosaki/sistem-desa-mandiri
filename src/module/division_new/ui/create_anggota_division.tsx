"use client"
import { LayoutNavbarNew, SkeletonSingle, TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { funGetUserByCookies } from '@/module/auth';
import { funGetAllmember, TypeUser } from '@/module/user';
import { ActionIcon, Avatar, Box, Button, Center, Divider, Flex, Grid, Group, Indicator, rem, Stack, Text, TextInput } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa6';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useShallowEffect } from '@mantine/hooks';
import { IDataMemberDivision } from '../lib/type_division';
import { funAddDivisionMember, funGetDivisionById } from '../lib/api_division';
import { IoArrowBackOutline, IoClose } from 'react-icons/io5';
import { Carousel } from '@mantine/carousel';
import { useHookstate } from '@hookstate/core';


export default function CreateAnggotaDivision() {
  const router = useRouter()
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [dataMember, setDataMember] = useState<TypeUser>([])
  const [memberDb, setMemberDb] = useState<IDataMemberDivision[]>([])
  const [group, setGroup] = useState("")
  const [isOpen, setOpen] = useState(false)
  const param = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [onClickSearch, setOnClickSearch] = useState(false)
  const tema = useHookstate(TEMA)

  const handleFileClick = (index: number) => {
    if (selectedFiles.some((i: any) => i.idUser == dataMember[index].id)) {
      setSelectedFiles(selectedFiles.filter((i: any) => i.idUser != dataMember[index].id))
    } else {
      setSelectedFiles([...selectedFiles, { idUser: dataMember[index].id, name: dataMember[index].name, img: dataMember[index].img }])
    }
  };

  function handleXMember(id: number) {
    setSelectedFiles(selectedFiles.filter((i: any) => i.idUser != id))
  }


  async function loadMember(group: string, search: string) {
    setLoading(true)
    const res = await funGetAllmember('?active=true&group=' + group + '&search=' + search);
    const user = await funGetUserByCookies();

    if (res.success) {
      setDataMember(res.data.filter((i: any) => i.id != user.id))
    } else {
      toast.error(res.message)
    }
    setLoading(false)
  }

  async function loadFirst() {
    const respon = await funGetDivisionById(param.id);
    if (respon.success) {
      setMemberDb(respon.data.member)
      setGroup(respon.data.division.idGroup)
      loadMember(respon.data.division.idGroup, "")
    } else {
      toast.error(respon.message);
    }
  }

  async function addMember() {
    try {
      const res = await funAddDivisionMember(param.id, selectedFiles)
      if (res.success) {
        toast.success(res.message)
        router.push("/division/info/" + param.id)
      } else {
        toast.error(res.message)
      }
      setOpen(false)
    } catch (error) {
      setOpen(false)
      console.error(error);
      toast.error("Gagal menambahkan anggota divisi, coba lagi nanti");

    }
  }


  useShallowEffect(() => {
    loadFirst()
  }, []);

  const handleSearchClick = () => {
    setOnClickSearch(true);
  };

  const handleClose = () => {
    setOnClickSearch(false);
  };

  return (
    <Box>
      <LayoutNavbarNew back={`/division/info/${param.id}`} title="tambah anggota"
        menu={<ActionIcon onClick={handleSearchClick} variant="light" bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="search">
          <HiMagnifyingGlass size={20} color='white' />
        </ActionIcon>}
      />
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
                  onChange={(e: any) => loadMember(group, e.target.value)}
                />
              </Grid.Col>
            </Grid>
          </Box>
        )
        : null
      }
      <Box pos={'fixed'} top={80} pl={rem(20)} pr={rem(20)} pt={rem(20)} pb={rem(5)} w={"100%"} style={{
        maxWidth: rem(550),
        zIndex: 100,
        backgroundColor: `${tema.get().bgUtama}`,
        borderBottom: `1px solid ${"#E0DFDF"}`
      }}>
        {selectedFiles.length > 0 ? (
          <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"}  withControls={false}>
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
        {loading ?
          Array(8)
            .fill(null)
            .map((_, i) => (
              <Box key={i}>
                <SkeletonSingle />
              </Box>
            ))
          :
          <Box pt={90} mb={100}>
            {dataMember.map((v: any, index: any) => {
              const isSelected = selectedFiles.some((i: any) => i.idUser == dataMember[index].id)
              const found = memberDb.some((i: any) => i.idUser == v.id)
              return (
                <Box my={10} key={index} onClick={() => (!found) ? handleFileClick(index) : null}>
                  <Grid align='center' >
                    <Grid.Col span={2}>
                      <Avatar src={`https://wibu-storage.wibudev.com/api/files/${v.img}`} alt="it's me" size="lg" />
                    </Grid.Col>
                    <Grid.Col span={10}>
                      <Flex justify='space-between' align={"center"}>
                        <Flex direction={'column'} align="flex-start" justify="flex-start">
                          <Text pl={{ base: 10, xl: 0 }} lineClamp={1}>{v.name}</Text>
                          <Text pl={{ base: 10, xl: 0 }} c={"dimmed"} lineClamp={1}>{(found) ? "sudah menjadi anggota divisi" : ""}</Text>
                        </Flex>
                        {isSelected ? <FaCheck /> : null}
                      </Flex>
                    </Grid.Col>
                  </Grid>
                  <Box mt={10}>
                    <Divider size={"xs"} />
                  </Box>
                </Box>
              )
            })}
          </Box>
        }
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
          onClick={() => { setOpen(true) }}
        >
          Simpan
        </Button>
      </Box>
      <LayoutModal opened={isOpen} onClose={() => setOpen(false)}
        description="Apakah Anda yakin ingin menambahkan anggota divisi?"
        onYes={(val) => {
          if (val) {
            addMember()
          } else {
            setOpen(false)
          }
        }} />
    </Box>
  );
}
