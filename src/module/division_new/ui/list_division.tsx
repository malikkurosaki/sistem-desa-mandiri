'use client'
import { globalRole, LayoutDrawer, LayoutNavbarNew, SkeletonSingle, TEMA } from '@/module/_global';
import { ActionIcon, Avatar, Box, Card, Center, Divider, Flex, Grid, Group, Skeleton, Text, TextInput, Title } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { HiMagnifyingGlass, HiMiniUserGroup, HiOutlineListBullet, HiSquares2X2 } from 'react-icons/hi2';
import { MdAccountCircle } from 'react-icons/md';
import DrawerDivision from './drawer_division';
import { useMediaQuery, useShallowEffect } from '@mantine/hooks';
import { IDataDivison } from '../lib/type_division';
import { funGetAllDivision } from '../lib/api_division';
import toast from 'react-hot-toast';
import { useHookstate } from '@hookstate/core';

export default function ListDivision() {
  const [isList, setIsList] = useState(false)
  const router = useRouter()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [data, setData] = useState<IDataDivison[]>([])
  const [jumlah, setJumlah] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const searchParams = useSearchParams()
  const group = searchParams.get('group')
  const [loading, setLoading] = useState(true)
  const [nameGroup, setNameGroup] = useState('')
  const roleLogin = useHookstate(globalRole)
  const tema = useHookstate(TEMA)

  const paddingLift = useMediaQuery('(max-width: 505px)')


  const handleList = () => {
    setIsList(!isList)
  }

  const fetchData = async (search: string) => {
    try {
      setData([]);
      setLoading(true);
      const response = await funGetAllDivision('?search=' + search + '&group=' + group)
      if (response.success) {
        setData(response.data)
        setJumlah(response.data.length)
        setNameGroup(response.filter.name)
      } else {
        toast.error(response.message);
      }
      setLoading(false);
    } catch (error) {
      toast.error("Gagal mendapatkan divisi, coba lagi nanti");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  function searchDivision(search: string) {
    setSearchQuery(search)
    fetchData(search)
  }

  useShallowEffect(() => {
    fetchData(searchQuery)
  }, [searchQuery])


  return (
    <Box>
      <LayoutNavbarNew back='/home' title='Divisi'
        menu={
          (roleLogin.get() != "user" && roleLogin.get() != "coadmin") &&
          <ActionIcon variant="light" onClick={() => (setOpenDrawer(true))} bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiMenu size={20} color='white' />
          </ActionIcon>
        } />

      <Box p={20}>
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
              onChange={(val) => { searchDivision(val.target.value) }}
            />
          </Grid.Col>
          <Grid.Col span={'auto'}>
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
          {loading ?
            <>
              <Skeleton width={"100%"} height={100} radius={"md"} />
            </>
            :
            <Box bg={tema.get().utama} p={10} style={{ borderRadius: 10 }}>
              <Text fw={'bold'} c={'white'}>Total Divisi</Text>
              <Flex justify={'center'} align={'center'} h={'100%'}>
                <Text fz={40} fw={'bold'} c={'white'}>{jumlah}</Text>
              </Flex>
            </Box>
          }
        </Box>
        {isList ? (
          <Box pt={20}>
            {loading
              ? Array(6)
                .fill(null)
                .map((_, i) => (
                  <Box key={i}>
                    <SkeletonSingle />
                  </Box>
                ))
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
                              // gradient={{
                              //   from: '#DFDA7C',
                              //   to: '#F2AF46',
                              //   deg: 174
                              // }}
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
      <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
        <DrawerDivision />
      </LayoutDrawer>
    </Box>
  );
}