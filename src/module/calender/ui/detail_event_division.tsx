'use client'
import { LayoutDrawer, LayoutNavbarNew, SkeletonSingle, WARNA } from '@/module/_global';
import { ActionIcon, Avatar, Box, CopyButton, Flex, Group, Skeleton, Stack, Text, Tooltip } from '@mantine/core';
import React, { useState } from 'react';
import { BsCalendar2Event, BsCalendarDate } from 'react-icons/bs';
import { MdEventNote, MdOutlineFormatListBulleted } from "react-icons/md";
import { LuClock, LuCopy, LuLink } from "react-icons/lu";
import { FaCheck } from 'react-icons/fa6';
import { TbCopy } from 'react-icons/tb';
import { HiMenu } from 'react-icons/hi';
import DrawerDetailEvent from './drawer_detail_event';
import { useParams } from 'next/navigation';
import { funGetOneCalender } from '../lib/api_calender';
import { useShallowEffect } from '@mantine/hooks';
import moment from "moment";
import "moment/locale/id";
import { IDataDetailByIdCalender, IDataDetailByIdMember } from '../lib/type_calender';
import SkeletonDetailEvent from './skeleton_detail_event';

export default function DetailEventDivision() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const param = useParams<{ id: string, detail: string }>()
  const [isDataCalender, setDataCalender] = useState<IDataDetailByIdCalender>()
  const [isDataAnggota, setDataAnggota] = useState<IDataDetailByIdMember[]>([])
  const [isLengthMember, setLengthMember] = useState()
  const [loading, setLoading] = useState(true)


  const getData = async () => {
    try {
      setLoading(true)
      const response = await funGetOneCalender(param.detail)
      setDataCalender(response.data.calender)
      setDataAnggota(response.data.member)
      setLengthMember(response.data.total)
      setLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useShallowEffect(() => {
    getData()
  }, [])

  return (
    <Box>
      <LayoutNavbarNew back={`/division/${param.id}/calender/`} title="Detail Event"
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
            <Stack ml={10}>
              <Group mb={10} gap={30}>
                <BsCalendar2Event size={25} color={WARNA.biruTua} />
                <Text>{isDataCalender?.title}</Text>
              </Group>
              <Group mb={10} gap={30}>
                <BsCalendarDate size={25} color={WARNA.biruTua} />
                <Text>{moment(isDataCalender?.dateStart).format('LL')}</Text>
              </Group>
              <Group mb={10} gap={30}>
                <LuClock size={25} color={WARNA.biruTua} />
                <Text>{isDataCalender?.timeStart}  | {isDataCalender?.timeEnd} </Text>
              </Group>
              <Group mb={10} gap={30}>
                <BsCalendarDate size={25} color={WARNA.biruTua} />
                <Text>
                  {isDataCalender?.repeatEventTyper.toString() === '1' ? 'Acara 1 Kali' :
                    isDataCalender?.repeatEventTyper.toString() === '2' ? 'Hari Kerja (senin - jumat)' :
                      isDataCalender?.repeatEventTyper.toString() === '3' ? 'Minggu' :
                        isDataCalender?.repeatEventTyper.toString() === '4' ? 'Bulanan' :
                          isDataCalender?.repeatEventTyper.toString() === '5' ? 'Tahunan' :
                            ''}
                </Text>
              </Group>
              <Group mb={10} gap={30}>
                <LuLink size={25} color={WARNA.biruTua} />
                {isDataCalender?.linkMeet ? (
                  <Group justify='space-between'>
                    <Text>{isDataCalender?.linkMeet}</Text>
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
              </Group>
              <Group gap={30}>
                <MdOutlineFormatListBulleted size={25} color={WARNA.biruTua} />
                {isDataCalender?.desc ? (
                  <Text>{isDataCalender?.desc}</Text>
                ) : (
                  <Text>-</Text>
                )
                }
              </Group>
            </Stack>
          </Box>
        }
        {loading ?
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
                {isLengthMember == 0? (
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                    <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada anggota</Text>
                  </Box>
                ) :
                  <Box>
                    {isDataAnggota.map((v, i) => {
                      return (
                        <Flex
                          justify={"space-between"}
                          align={"center"}
                          mb={20}
                          key={i}
                        >
                          <Group>
                            <Avatar src={`/api/file/img?jenis=image&cat=user&file=${v.img}`} alt="it's me" size="lg" />
                            <Box>
                              <Text c={WARNA.biruTua} fw={"bold"}>
                                {v.name}
                              </Text>
                              <Text c={"#5A687D"} fz={14}>
                                {v.email}
                              </Text>
                            </Box>
                          </Group>
                        </Flex>
                      );
                    })}
                  </Box>
                }
              </Box>
            </Box>
          </Box>
        }
      </Box>
      <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
        <DrawerDetailEvent />
      </LayoutDrawer>
    </Box>
  );
}

