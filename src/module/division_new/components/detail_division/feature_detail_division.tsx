"use client"
import { WARNA } from '@/module/_global';
import { ActionIcon, Box, Center, Grid, Group, SimpleGrid, Text } from '@mantine/core';
import React from 'react';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { LuClipboardEdit } from "react-icons/lu";
import { GoCommentDiscussion } from "react-icons/go";
import { BsFileEarmarkText } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { LuFileSignature } from "react-icons/lu";
import { useRouter } from 'next/navigation';

export default function FeatureDetailDivision({ id }: { id: string }) {
  const router = useRouter()
  return (
    <Box pt={10}>
      <Text c={WARNA.biruTua} mb={10} fw={'bold'} fz={16}>Features</Text>
      <SimpleGrid
        cols={{ base: 2, sm: 2, lg: 2 }}
        style={{
          alignItems: "center",
          alignContent: "center"
        }}
      >
        <Box bg={'white'} style={{
          border: `1px solid ${WARNA.bgHijauMuda}`,
          borderRadius: 10,
          padding: 10
        }} onClick={() => router.push(id + '/task')}>
          <Grid justify='center' align='center'>
            <Grid.Col span={"auto"}>
              <ActionIcon variant="filled"
                size={"xl"}
                aria-label="Gradient action icon"
                radius={100}
                color={WARNA.bgHijauMuda}
              >
                <LuClipboardEdit size={25} color={WARNA.biruTua} />
              </ActionIcon>
            </Grid.Col>
            <Grid.Col span={{ base: 7, md: 9 }}>
              <Text fz={15} c={WARNA.biruTua} fw={"bold"}>Tugas</Text>
              <Group justify='space-between' align='center'>
                <Text fz={10} c={"gray"}>23 Tugas</Text>
                <IoIosArrowRoundForward size={20} color='gray' />
              </Group>
            </Grid.Col>
          </Grid>
        </Box>
        <Box bg={'white'} style={{
          border: `1px solid ${WARNA.bgHijauMuda}`,
          borderRadius: 10,
          padding: 10
        }} onClick={() => router.push('/document')}>
          <Grid justify='center' align='center'>
            <Grid.Col span={"auto"}>
              <ActionIcon variant="filled"
                size={"xl"}
                aria-label="Gradient action icon"
                radius={100}
                color={WARNA.bgHijauMuda}
              >
                <BsFileEarmarkText size={25} color={WARNA.biruTua} />
              </ActionIcon>
            </Grid.Col>
            <Grid.Col span={{ base: 7, md: 9 }}>
              <Text fz={15} c={WARNA.biruTua} fw={"bold"}>Dokumen</Text>
              <Group justify='space-between' align='center'>
                <Text fz={10} c={"gray"}>23 Tugas</Text>
                <IoIosArrowRoundForward size={20} color='gray' />
              </Group>
            </Grid.Col>
          </Grid>
        </Box>
        <Box bg={'white'} style={{
          border: `1px solid ${WARNA.bgHijauMuda}`,
          borderRadius: 10,
          padding: 10
        }} onClick={() => router.push('/discussion')}>
          <Grid justify='center' align='center'>
            <Grid.Col span={"auto"}>
              <ActionIcon variant="filled"
                size={"xl"}
                aria-label="Gradient action icon"
                radius={100}
                color={WARNA.bgHijauMuda}
              >
                <GoCommentDiscussion size={25} color={WARNA.biruTua} />
              </ActionIcon>
            </Grid.Col>
            <Grid.Col span={{ base: 7, md: 9 }}>
              <Text fz={15} c={WARNA.biruTua} fw={"bold"}>Diskusi</Text>
              <Group justify='space-between' align='center'>
                <Text fz={10} c={"gray"}>23 Tugas</Text>
                <IoIosArrowRoundForward size={20} color='gray' />
              </Group>
            </Grid.Col>
          </Grid>
        </Box>
        <Box bg={'white'} style={{
          border: `1px solid ${WARNA.bgHijauMuda}`,
          borderRadius: 10,
          padding: 10
        }} onClick={() => router.push('/calender')}>
          <Grid justify='center' align='center'>
            <Grid.Col span={"auto"}>
              <ActionIcon variant="filled"
                size={"xl"}
                aria-label="Gradient action icon"
                radius={100}
                color={WARNA.bgHijauMuda}
              >
                <IoCalendarOutline size={25} color={WARNA.biruTua} />
              </ActionIcon>
            </Grid.Col>
            <Grid.Col span={{ base: 7, md: 9 }}>
              <Text fz={15} c={WARNA.biruTua} fw={"bold"}>Kalender</Text>
              <Group justify='space-between' align='center'>
                <Text fz={10} c={"gray"}>23 Tugas</Text>
                <IoIosArrowRoundForward size={20} color='gray' />
              </Group>
            </Grid.Col>
          </Grid>
        </Box>
      </SimpleGrid>
    </Box>
  );
}


