"use client"
import { globalRole, TEMA, WARNA } from '@/module/_global';
import { ActionIcon, Avatar, Badge, Box, Card, Center, Divider, Flex, Grid, Group, Skeleton, Text, TextInput, Title } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { HiMagnifyingGlass, HiMiniPresentationChartBar, HiOutlineListBullet, HiSquares2X2 } from 'react-icons/hi2';
import { MdAccountCircle } from 'react-icons/md';
import { RiCircleFill } from 'react-icons/ri';
import { funGetAllProject } from '../lib/api_project';
import toast from 'react-hot-toast';
import { useMediaQuery, useShallowEffect } from '@mantine/hooks';
import { IDataProject } from '../lib/type_project';
import { useHookstate } from '@hookstate/core';
import _ from 'lodash';

export default function ListProject() {
  const [isList, setIsList] = useState(false)
  const router = useRouter()
  const [isData, setData] = useState<IDataProject[]>([])
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const group = searchParams.get('group')
  const [searchQuery, setSearchQuery] = useState('')
  const roleLogin = useHookstate(globalRole)
  const [nameGroup, setNameGroup] = useState('')
  const tema = useHookstate(TEMA)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await funGetAllProject('?status=' + status + '&search=' + searchQuery + '&group=' + group)
      if (response.success) {
        setData(response?.data)
        setNameGroup(response.filter.name)
      } else {
        toast.error(response.message);
      }
      setLoading(false);
    } catch (error) {
      toast.error("Gagal mendapatkan kegiatan, coba lagi nanti");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useShallowEffect(() => {
    fetchData();
  }, [status, searchQuery]);

  const handleList = () => {
    setIsList(!isList)
  }
  const isMobile = useMediaQuery('(max-width: 369px)');

  return (
    <Box mt={20}>
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
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
            value={searchQuery}
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
          <Box>
            <Skeleton width={"100%"} height={100} radius={"md"} />
          </Box>
          :
          <Box bg={tema.get().bgTotalKegiatan} p={10} style={{ borderRadius: 10 }}>
            <Text fw={'bold'} c={tema.get().utama}>Total Kegiatan</Text>
            <Flex justify={'center'} align={'center'} h={'100%'}>
              <Text fz={40} fw={'bold'} c={tema.get().utama}>{isData.length}</Text>
            </Flex>
          </Box>
        }
        {isList ? (
          <Box pt={20}>
            {isData.map((v, i) => {
              return (
                <Box key={i}>
                  <Grid align='center'>
                    <Grid.Col span={{
                      base: 2,
                      xl: 1
                    }}>
                      <Group onClick={() => router.push(`/project/${v.id}`)}>
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
                            <HiMiniPresentationChartBar size={25} color={tema.get().utama} />
                          </ActionIcon>
                        </Center>
                      </Group>
                    </Grid.Col>
                    <Grid.Col span={{
                      base: 10,
                      xl: 11
                    }}>
                      <Group justify='space-between' align='center'>
                        <Box>
                          <Box w={{
                            base: isMobile ? 200 : 230,
                            xl: 430
                          }}>
                            <Text truncate="end" pl={20}>
                              {v.title}
                            </Text>
                          </Box>

                        </Box>
                        <RiCircleFill size={12} color={
                          v.status === 0 ? '#1372C4' :
                            v.status === 1 ? '#C5771A' :
                              v.status === 2 ? '#0B6025' :
                                v.status === 3 ? '#BB1F1F' :
                                  ""
                        } />
                      </Group>
                    </Grid.Col>
                  </Grid>
                  <Divider my="sm" />
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box pt={20}>
            {loading ?
              Array(3)
                .fill(null)
                .map((_, i) => (
                  <Box key={i} mb={20}>
                    <Skeleton width={"100%"} height={200} radius={"md"} />
                  </Box>
                ))
              :
              _.isEmpty(isData)
                ?
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                  <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada Kegiatan</Text>
                </Box>
                :
                isData.map((v, i) => {
                  return (
                    <Box key={i} mb={20}>
                      <Card shadow="sm" padding="md" component="a" radius={10} onClick={() => router.push(`/project/${v.id}`)}>
                        <Card.Section>
                          <Box h={120} bg={tema.get().utama}>
                            <Flex justify={'center'} align={'center'} h={"100%"} pl={20} pr={20}>
                              <Title order={3} c={"white"} ta={"center"} lineClamp={2}>{v.title}</Title>
                            </Flex>
                          </Box>
                        </Card.Section>
                        <Box pt={10}>
                          <Text>{v.desc}</Text>
                          <Group align='center' pt={10} justify='space-between'>
                            <Badge color={
                              v.status === 0 ? '#1372C4' :
                                v.status === 1 ? '#C5771A' :
                                  v.status === 2 ? '#0B6025' :
                                    v.status === 3 ? '#BB1F1F' :
                                      ""
                            }>{
                                v.status === 0 ? 'Segera' :
                                  v.status === 1 ? 'Dikerjakan' :
                                    v.status === 2 ? 'Selesai' :
                                      v.status === 3 ? 'Dibatalkan' :
                                        ""
                              }</Badge>
                            <Avatar.Group>
                              <Avatar>
                                <MdAccountCircle size={32} color={tema.get().utama} />
                              </Avatar>
                              <Avatar>+{v.member - 1}</Avatar>
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
    </Box >
  );
}



