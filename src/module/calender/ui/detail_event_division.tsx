'use client'
import { LayoutDrawer, LayoutNavbarNew, SkeletonSingle, WARNA } from '@/module/_global';
import { ActionIcon, Avatar, Box, CopyButton, Divider, Flex, Grid, Group, SimpleGrid, Skeleton, Spoiler, Stack, Text, Tooltip } from '@mantine/core';
import React, { useState } from 'react';
import { BsCalendar2Event, BsCalendarDate } from 'react-icons/bs';
import { MdEventNote, MdOutlineFormatListBulleted } from "react-icons/md";
import { LuClock, LuCopy, LuLink } from "react-icons/lu";
import { FaCheck, FaUser } from 'react-icons/fa6';
import { TbCopy } from 'react-icons/tb';
import { HiMenu } from 'react-icons/hi';
import DrawerDetailEvent from './drawer_detail_event';
import { useParams, useRouter } from 'next/navigation';
import { funDeleteMemberCalender, funGetOneCalender } from '../lib/api_calender';
import { useShallowEffect } from '@mantine/hooks';
import moment from "moment";
import "moment/locale/id";
import { IDataDetailByIdCalender, IDataDetailByIdMember } from '../lib/type_calender';
import SkeletonDetailEvent from './skeleton_detail_event';
import { IoIosCloseCircle } from 'react-icons/io';
import LayoutModal from '@/module/_global/layout/layout_modal';
import toast from 'react-hot-toast';

export default function DetailEventDivision() {
  const param = useParams<{ id: string, detail: string }>()
  const [isDataCalender, setDataCalender] = useState<IDataDetailByIdCalender>()
  const [isDataAnggota, setDataAnggota] = useState<IDataDetailByIdMember[]>([])
  const [isLengthMember, setLengthMember] = useState()
  const [loading, setLoading] = useState(true)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openDrawerUser, setOpenDrawerUser] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const router = useRouter()
  const [dataChoose, setDataChoose] = useState({ id: '', name: '' })


  const getData = async () => {
    try {
      setLoading(true)
      const response = await funGetOneCalender(param.detail)
      setDataCalender(response.data.calender)
      setDataAnggota(response.data.member)
      setLengthMember(response.data.total)
      setLoading(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useShallowEffect(() => {
    getData()
  }, [])

  async function onSubmit() {
    try {
      const res = await funDeleteMemberCalender(String(isDataCalender?.idCalendar), { idUser: dataChoose.id });
      if (res.success) {
        toast.success(res.message)
        setDataChoose({ id: '', name: '' })
        getData()
        setOpenDrawer(false)
        setOpenDrawerUser(false)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengeluarkan anggota, coba lagi nanti");
    }
  }

  return (
    <Box>
      <LayoutNavbarNew back={`/division/${param.id}/calender/`} title="Detail Acara"
        menu={<ActionIcon variant="light" onClick={() => setOpenDrawer(true)} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
          <HiMenu size={20} color='white' />
        </ActionIcon>} />
      <Box p={20}>
        {loading
          ?
          <SkeletonDetailEvent />
          :
          <Box style={{
            border: `1px solid ${"#D8D8F1"}`,
            padding: 20,
            borderRadius: 10
          }}>
            <Stack>
              <Grid gutter={"lg"}>
                <Grid.Col span={{
                  base: 2,
                  xl: 1
                }}>
                  <BsCalendar2Event size={25} color={WARNA.biruTua} />
                </Grid.Col>
                <Grid.Col span={{
                  base: 10,
                  xl: 11
                }}>
                  <Text>{isDataCalender?.title}</Text>
                </Grid.Col>
              </Grid>
              <Grid gutter={"lg"}>
                <Grid.Col span={{
                  base: 2,
                  xl: 1
                }}>
                  <BsCalendarDate size={25} color={WARNA.biruTua} />
                </Grid.Col>
                <Grid.Col span={{
                  base: 10,
                  xl: 11
                }}>
                  <Text>{moment(isDataCalender?.dateStart).format('LL')}</Text>
                </Grid.Col>
              </Grid>
              <Grid gutter={"lg"}>
                <Grid.Col span={{
                  base: 2,
                  xl: 1
                }}>
                  <LuClock size={25} color={WARNA.biruTua} />
                </Grid.Col>
                <Grid.Col span={{
                  base: 10,
                  xl: 11
                }}>
                  <Text>{isDataCalender?.timeStart}  | {isDataCalender?.timeEnd} </Text>
                </Grid.Col>
              </Grid>
              <Grid gutter={"lg"}>
                <Grid.Col span={{
                  base: 2,
                  xl: 1
                }}>
                  <BsCalendarDate size={25} color={WARNA.biruTua} />
                </Grid.Col>
                <Grid.Col span={{
                  base: 10,
                  xl: 11
                }}>
                  <Text>
                    {isDataCalender?.repeatEventTyper.toString() === 'once' ? 'Acara 1 Kali' :
                      isDataCalender?.repeatEventTyper.toString() === 'daily' ? 'Setiap Hari' :
                        // isDataCalender?.repeatEventTyper.toString() === 'weekdays' ? 'Hari Kerja (senin - jumat)' :
                        isDataCalender?.repeatEventTyper.toString() === 'weekly' ? 'Mingguan' :
                          isDataCalender?.repeatEventTyper.toString() === 'monthly' ? 'Bulanan' :
                            isDataCalender?.repeatEventTyper.toString() === 'yearly' ? 'Tahunan' :
                              ''}
                  </Text>
                </Grid.Col>
              </Grid>
              <Grid gutter={"lg"}>
                <Grid.Col span={{
                  base: 2,
                  xl: 1
                }}>
                  <LuLink size={25} color={WARNA.biruTua} />
                </Grid.Col>
                <Grid.Col span={{
                  base: 10,
                  xl: 11
                }}>
                  {isDataCalender?.linkMeet ? (
                    <Group justify='space-between'>
                      <Box w={{
                        base: 170,
                        xl: 380
                      }}>
                        <Text lineClamp={1}>{isDataCalender?.linkMeet}</Text>
                      </Box>
                      <CopyButton value={String(isDataCalender?.linkMeet)} timeout={2000}>
                        {({ copied, copy }) => (
                          <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                            <ActionIcon color={copied ? 'teal' : WARNA.biruTua} variant="subtle" onClick={copy}>
                              {copied ? (
                                <FaCheck size={20} />
                              ) : (
                                <TbCopy size={20} />
                              )}
                            </ActionIcon>
                          </Tooltip>
                        )}
                      </CopyButton>
                    </Group>
                  ) : (
                    <Text>-</Text>
                  )
                  }
                </Grid.Col>
              </Grid>
              <Grid gutter={"lg"}>
                <Grid.Col span={{
                  base: 2,
                  xl: 1
                }}>
                  <MdOutlineFormatListBulleted size={25} color={WARNA.biruTua} />
                </Grid.Col>
                <Grid.Col span={{
                  base: 10,
                  xl: 11
                }}>
                  {isDataCalender?.desc ? (
                    <Spoiler maxHeight={80} showLabel="Lebih banyak" hideLabel="Lebih sedikit">
                      <Text>{isDataCalender?.desc}</Text>
                    </Spoiler>
                  ) : (
                    <Text>-</Text>
                  )
                  }
                </Grid.Col>
              </Grid>
            </Stack>
          </Box>
        }

        {
          loading ?
            <Box pt={20}>
              <Box
                style={{
                  border: `1px solid ${"#C7D6E8"}`,
                  borderRadius: 10,
                }}
                px={20}
                pb={20}
              >
                {Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <Box
                      key={i}
                    >
                      <SkeletonSingle />
                    </Box>
                  ))}
              </Box>
            </Box>
            :

            <Box pt={20}>
              <Group justify='space-between'>
                <Text fw={"bold"}>Total Anggota</Text>
                <Text>{isLengthMember} Anggota</Text>
              </Group>
              <Box mb={20}>
                <Box
                  style={{
                    border: `1px solid ${"#C7D6E8"}`,
                    borderRadius: 10,
                  }}
                  px={20}
                  pt={20}
                >
                  {
                    isLengthMember == 0 ? (
                      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                        <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada anggota</Text>
                      </Box>
                    ) :
                      <Box>
                        {
                          isDataAnggota.map((v, i) => {
                            return (
                              <Box onClick={() => {
                                setDataChoose({ id: v.idUser, name: v.name })
                                setOpenDrawerUser(true)
                              }} key={i}>
                                <Box my={10}>
                                  <Grid align='center' gutter={"lg"}>
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
                                          <Text c={"#5A687D"} fz={14} lineClamp={1}>
                                            {v.email}
                                          </Text>
                                        </Flex>
                                      </Flex>
                                    </Grid.Col>
                                  </Grid>
                                  <Box mt={10}>
                                    <Divider size={"xs"} />
                                  </Box>
                                </Box>
                              </Box>
                            )
                          })
                        }
                      </Box>
                  }
                </Box>
              </Box>
            </Box>
        }
      </Box>



      <LayoutDrawer opened={openDrawerUser} title={<Text lineClamp={1}>{dataChoose.name}</Text>} onClose={() => setOpenDrawerUser(false)}>
        <Box>
          <Stack pt={10}>
            <SimpleGrid
              cols={{ base: 2, sm: 3, lg: 3 }}
            >
              <Flex
                onClick={() => { router.push('/member/' + dataChoose.id) }}
                justify={'center'} align={'center'} direction={'column'} >
                <Box>
                  <FaUser size={30} color={WARNA.biruTua} />
                </Box>
                <Box>
                  <Text c={WARNA.biruTua}>Lihat profil</Text>
                </Box>
              </Flex>

              <Flex onClick={() => { setOpenModal(true) }} justify={'center'} align={'center'} direction={'column'} >
                <Box>
                  <IoIosCloseCircle size={30} color={WARNA.biruTua} />
                </Box>
                <Box>
                  <Text c={WARNA.biruTua}>Keluarkan anggota</Text>
                </Box>
              </Flex>
            </SimpleGrid>
          </Stack>
        </Box>
      </LayoutDrawer>

      <LayoutModal opened={isOpenModal} onClose={() => setOpenModal(false)}
        description="Apakah Anda yakin ingin mengeluarkan anggota?"
        onYes={(val) => {
          if (val) {
            onSubmit()
          }
          setOpenModal(false)
        }} />
      <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
        <DrawerDetailEvent idCalendar={String(isDataCalender?.idCalendar)} />
      </LayoutDrawer>
    </Box>
  );
}

