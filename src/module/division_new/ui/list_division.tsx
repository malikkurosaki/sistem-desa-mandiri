'use client'
import { currentScroll, globalNotifPage, globalRole, LayoutDrawer, LayoutNavbarNew, ReloadButtonTop, SkeletonList, TEMA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Avatar, Box, Card, Center, Divider, Flex, Grid, Group, Skeleton, Text, TextInput, Title } from '@mantine/core';
import { useMediaQuery, useShallowEffect } from '@mantine/hooks';
import _ from 'lodash';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiMenu } from 'react-icons/hi';
import { HiMagnifyingGlass, HiMiniUserGroup, HiOutlineListBullet, HiSquares2X2 } from 'react-icons/hi2';
import { MdAccountCircle } from 'react-icons/md';
import { funGetAllDivision } from '../lib/api_division';
import { IDataDivison } from '../lib/type_division';
import DrawerDivision from './drawer_division';

export default function ListDivision() {
  const [isList, setIsList] = useState(false)
  const router = useRouter()
  const [data, setData] = useState<IDataDivison[]>([])
  const [jumlah, setJumlah] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const searchParams = useSearchParams()
  const group = searchParams.get('group')
  const [loading, setLoading] = useState(true)
  const [nameGroup, setNameGroup] = useState('')
  const roleLogin = useHookstate(globalRole)
  const tema = useHookstate(TEMA)
  const { value: containerRef } = useHookstate(currentScroll);
  const [isPage, setPage] = useState(1)
  const paddingLift = useMediaQuery('(max-width: 505px)')
  const [isRefresh, setRefresh] = useState(false)
  const notifLoadPage = useHookstate(globalNotifPage)
  const status = searchParams.get('active')


  const handleList = () => {
    setIsList(!isList)
  }

  const fetchData = async (loading: boolean) => {
    try {

      setLoading(loading);
      if (isPage == 1) {
        setData([])
      }
      const response = await funGetAllDivision('?active=' + status + '&search=' + searchQuery + '&group=' + group + '&page=' + isPage)
      if (response.success) {
        setJumlah(response.total)
        setNameGroup(response.filter.name)
        if (isPage == 1) {
          setData(response.data)
        } else {
          setData((data) => [...data, ...response.data])
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Gagal mendapatkan divisi, coba lagi nanti");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useShallowEffect(() => {
    setPage(1)
    fetchData(true)
  }, [status, searchQuery])


  useShallowEffect(() => {
    fetchData(false)
  }, [isPage])

  useEffect(() => {
    const handleScroll = async () => {
      if (containerRef && containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const containerHeight = containerRef.current.clientHeight;
        const scrollHeight = containerRef.current.scrollHeight;

        if (scrollTop + containerHeight >= scrollHeight) {
          setPage(isPage + 1)
        }
      }
    };

    const container = containerRef?.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, isPage]);

  useShallowEffect(() => {
    if (notifLoadPage.get().category == 'division' && notifLoadPage.get().load == true) {
      setRefresh(true)
    }
  }, [notifLoadPage.get().load])

  function onRefresh() {
    notifLoadPage.set({
      category: '',
      load: false
    })
    setRefresh(false)
    setPage(1)
    setTimeout(() => {
      fetchData(false)
    }, 500)
  }


  return (
    <Box>
      <Box py={20}>
        {
          isRefresh &&
          <ReloadButtonTop
            onReload={() => { onRefresh() }}
            title='UPDATE'
          />

        }
        <Grid justify='center' align='center'>
          <Grid.Col span={10}>
            <TextInput
              styles={{
                input: {
                  color: tema.get().utama,
                  borderRadius: '#A3A3A3',
                  borderColor: '#A3A3A3',
                },
              }}
              size="md"
              radius={30}
              leftSection={<HiMagnifyingGlass size={20} />}
              placeholder="Pencarian"
              value={searchQuery}
              onChange={(val) => { setSearchQuery(val.target.value) }}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <Flex justify={'center'}>
              {isList ? (
                <HiOutlineListBullet size={35} color={tema.get().utama} onClick={handleList} />
              ) : (
                <HiSquares2X2 size={35} color={tema.get().utama} onClick={handleList} />
              )}
            </Flex>
          </Grid.Col>
        </Grid>
        <Box pt={20}>
          {roleLogin.get() == 'supadmin' && <Text>Filter by: {nameGroup}</Text>}
          <Box bg={tema.get().bgTotalKegiatan} p={10} style={{ borderRadius: 10 }}>
            <Text fw={'bold'} c={tema.get().utama}>Total Divisi</Text>
            <Flex justify={'center'} align={'center'} h={'100%'}>
              <Text fz={40} fw={'bold'} c={tema.get().utama}>{jumlah}</Text>
            </Flex>
          </Box>
        </Box>
        {isList ? (
          <Box pt={20}>
            {loading
              ? Array(6)
                .fill(null)
                .map((_, i) => (
                  <Box key={i}>
                    <SkeletonList />
                  </Box>
                ))
              :
              _.isEmpty(data)
                ?
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                  <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada Divisi</Text>
                </Box>
                :
                data?.map((v: any, i: any) => {
                  return (
                    <Box key={i}>
                      <Grid align='center' onClick={() => router.push(`/division/${v.id}`)}>
                        <Grid.Col span={{
                          base: 1,
                          xs: 1,
                          sm: 1,
                          md: 1,
                          lg: 1,
                          xl: 1
                        }}>
                          <Group >
                            <Center>
                              <ActionIcon
                                variant="gradient"
                                size={50}
                                aria-label="Gradient action icon"
                                radius={100}
                                bg={tema.get().bgFiturHome}
                              >
                                <HiMiniUserGroup size={25} color={tema.get().utama} />
                              </ActionIcon>
                            </Center>
                          </Group>
                        </Grid.Col>
                        <Grid.Col span={{
                          base: 11,
                          xs: 11,
                          sm: 11,
                          md: 11,
                          lg: 11,
                          xl: 11,
                        }}>
                          <Box>
                            <Box w={{
                              base: 280,
                              xl: 430
                            }}>
                              <Text truncate="end" pl={paddingLift ? 30 : 20}>
                                {v.name}
                              </Text>
                            </Box>
                          </Box>
                        </Grid.Col>
                      </Grid>
                      <Divider my="sm" />
                    </Box>
                  );
                })
            }
          </Box>
        ) : (
          <Box pt={20}>
            {loading ?
              Array(6)
                .fill(null)
                .map((_, i) => (
                  <Box key={i} pb={20}>
                    <Skeleton width={"100%"} height={200} radius={"md"} />
                  </Box>
                ))
              :
              data?.map((v: any, i: any) => {
                return (
                  <Box key={i} mb={20}>
                    <Card shadow="sm" padding="md" component="a" radius={10} onClick={() => router.push(`/division/${v.id}`)}>
                      <Card.Section>
                        <Box h={120} bg={tema.get().utama}>
                          <Flex justify={'center'} align={'center'} h={"100%"} pl={20} pr={20}>
                            <Title order={3} c={"white"} ta={"center"} lineClamp={2}>{v.name}</Title>
                          </Flex>
                        </Box>
                      </Card.Section>
                      <Box pt={10}>
                        <Text lineClamp={2}>{v.desc}</Text>
                        <Group align='center' pt={10} justify='flex-end'>
                          <Avatar.Group>
                            <Avatar>
                              <MdAccountCircle size={32} color={tema.get().utama} />
                            </Avatar>
                            <Avatar>
                              {
                                (v.jumlah_member == 0) ? "0" : "+" + (v.jumlah_member - 1)
                              }
                            </Avatar>
                          </Avatar.Group>
                        </Group>
                      </Box>
                    </Card>
                  </Box>
                );
              })
            }
          </Box>
        )}
      </Box>
    </Box>
  );
}