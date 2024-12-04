"use client"
import { TEMA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Box, Grid, Group, SimpleGrid, Text } from '@mantine/core';
import { useMediaQuery, useShallowEffect } from '@mantine/hooks';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsClipboard2Check, BsFileEarmarkText } from "react-icons/bs";
import { GoCommentDiscussion } from "react-icons/go";
import { IoIosArrowRoundForward } from 'react-icons/io';
import { IoCalendarOutline } from "react-icons/io5";
import { funGetDetailDivisionById } from '../lib/api_division';
import { IDataJumlahDetailDivision } from '../lib/type_division';

export default function FeatureDetailDivision() {
  const param = useParams<{ id: string }>()
  const router = useRouter()
  const [feature, setFeature] = useState<IDataJumlahDetailDivision>()
  const tema = useHookstate(TEMA)

  async function fetchData() {
    try {
      const res = await funGetDetailDivisionById(param.id, 'jumlah');
      if (res.success) {
        setFeature(res.data)
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan divisi, coba lagi nanti");
    }
  }

  useShallowEffect(() => {
    fetchData()
  }, [param.id])
  const isMobile = useMediaQuery('(max-width: 399px)');
  const isMobile2 = useMediaQuery('(max-width: 411px)');

  return (
    <Box pt={10}>
      <Text c={tema.get().utama} mb={10} fw={'bold'} fz={16}>Fitur</Text>
      <SimpleGrid
        cols={{ base: 2, sm: 2, lg: 2 }}
        style={{
          alignItems: "center",
          alignContent: "center"
        }}
      >
        <Box bg={'white'} style={{
          border: `1px solid ${tema.get().bgTotalKegiatan}`,
          borderRadius: 10,
          padding: 10
        }} onClick={() => router.push(param.id + '/task?status=0')}>
          <Grid justify='center' align='center'>
            <Grid.Col span={{
              base: isMobile2 ? 4 : 3.5,
              xs: 3,
              sm: 3,
              md: 3,
            }}>
              <ActionIcon variant="filled"
                size={isMobile2 ? "lg" : "xl"}
                aria-label="Gradient action icon"
                radius={100}
                color={tema.get().bgTotalKegiatan}
              >
                <BsClipboard2Check size={isMobile2 ? 20 : 25} color={tema.get().utama} />
              </ActionIcon>
            </Grid.Col>
            <Grid.Col
              span={{
                base: isMobile2 ? 8 : 7.5,
                xs: 9,
                md: 9,
                sm: 9,
              }}>
              <Text fz={15} c={tema.get().utama} fw={"bold"}>Tugas</Text>
              <Group justify='space-between' align='center'>
                <Text fz={10} c={"gray"}>{feature?.tugas} Tugas</Text>
                {!isMobile && <IoIosArrowRoundForward size={20} color='gray' />}
              </Group>
            </Grid.Col>
          </Grid>
        </Box>
        <Box bg={'white'} style={{
          border: `1px solid ${tema.get().bgTotalKegiatan}`,
          borderRadius: 10,
          padding: 10
        }} onClick={() => router.push(param.id + '/document')}>
          <Grid justify='center' align='center'>
            <Grid.Col span={{
              base: isMobile2 ? 4 : 3.5,
              xs: 3,
              sm: 3,
              md: 3,
            }}>
              <ActionIcon variant="filled"
                size={isMobile2 ? "lg" : "xl"}
                aria-label="Gradient action icon"
                radius={100}
                color={tema.get().bgTotalKegiatan}
              >
                <BsFileEarmarkText size={isMobile2 ? 20 : 25} color={tema.get().utama} />
              </ActionIcon>
            </Grid.Col>
            <Grid.Col span={{
              base: isMobile2 ? 8 : 7.5,
              xs: 9,
              md: 9,
              sm: 9,
            }}>
              <Text fz={15} c={tema.get().utama} fw={"bold"}>Dokumen</Text>
              <Group justify='space-between' align='center'>
                <Text fz={10} c={"gray"}>{feature?.dokumen} File</Text>
                {!isMobile && <IoIosArrowRoundForward size={20} color='gray' />}
              </Group>
            </Grid.Col>
          </Grid>
        </Box>
        <Box bg={'white'} style={{
          border: `1px solid ${tema.get().bgTotalKegiatan}`,
          borderRadius: 10,
          padding: 10
        }} onClick={() => router.push(param.id + '/discussion')}>
          <Grid justify='center' align='center'>
            <Grid.Col span={{
              base: isMobile2 ? 4 : 3.5,
              xs: 3,
              sm: 3,
              md: 3,
            }}>
              <ActionIcon variant="filled"
                size={isMobile2 ? "lg" : "xl"}
                aria-label="Gradient action icon"
                radius={100}
                color={tema.get().bgTotalKegiatan}
              >
                <GoCommentDiscussion size={isMobile2 ? 20 : 25} color={tema.get().utama} />
              </ActionIcon>
            </Grid.Col>
            <Grid.Col span={{
              base: isMobile2 ? 8 : 7.5,
              xs: 9,
              md: 9,
              sm: 9,
            }}>
              <Text fz={15} c={tema.get().utama} fw={"bold"}>Diskusi</Text>
              <Group justify='space-between' align='center'>
                <Text fz={10} c={"gray"}>{feature?.diskusi} Diskusi</Text>
                {!isMobile && <IoIosArrowRoundForward size={20} color='gray' />}
              </Group>
            </Grid.Col>
          </Grid>
        </Box>
        <Box bg={'white'} style={{
          border: `1px solid ${tema.get().bgTotalKegiatan}`,
          borderRadius: 10,
          padding: 10
        }} onClick={() => router.push(param.id + '/calender')}>
          <Grid justify='center' align='center'>
            <Grid.Col span={{
              base: isMobile2 ? 4 : 3.5,
              xs: 3,
              sm: 3,
              md: 3,
            }}>
              <ActionIcon variant="filled"
                size={isMobile2 ? "lg" : "xl"}
                aria-label="Gradient action icon"
                radius={100}
                color={tema.get().bgTotalKegiatan}
              >
                <IoCalendarOutline size={isMobile2 ? 20 : 25} color={tema.get().utama} />
              </ActionIcon>
            </Grid.Col>
            <Grid.Col span={{
              base: isMobile2 ? 8 : 7.5,
              xs: 9,
              md: 9,
              sm: 9,
            }}>
              <Text fz={15} c={tema.get().utama} fw={"bold"}>Kalender</Text>
              <Group justify='space-between' align='center'>
                <Text fz={10} c={"gray"}>{feature?.kalender} Acara</Text>
                {!isMobile && <IoIosArrowRoundForward size={20} color='gray' />}
              </Group>
            </Grid.Col>
          </Grid>
        </Box>
      </SimpleGrid>
    </Box>
  );
}


