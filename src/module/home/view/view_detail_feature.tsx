'use client'
import { LayoutNavbarHome, WARNA } from '@/module/_global';
import { ActionIcon, Box, Center, Grid, Group, SimpleGrid, Text } from '@mantine/core';
import React from 'react';
import { HiMiniUserGroup, HiMiniPresentationChartBar, HiMegaphone, HiSquares2X2, HiChevronLeft, HiUserGroup, HiUsers } from "react-icons/hi2";
import { PiUsersFourFill } from "react-icons/pi";
import { FaUsersRays, FaUserTie } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import LayoutIconBack from '@/module/_global/layout/layout_icon_back';

export default function ViewDetailFeature() {
  const router = useRouter()
  return (
    <>
      <LayoutNavbarHome>
        <Grid justify='center' align='center'>
          <Grid.Col span="auto">
            <LayoutIconBack back='/home' />
          </Grid.Col>
          <Grid.Col span={6}>
            <Text ta={'center'} fw={'bold'} c={'white'} >SEMUA FITUR</Text>
          </Grid.Col>
          <Grid.Col span="auto"></Grid.Col>
        </Grid>
      </LayoutNavbarHome>
      <Box p={20}>
        <Box >
          <SimpleGrid
            cols={{ base: 4, sm: 4, lg: 4 }}
          >
            <Box>
              <Center>
                <ActionIcon variant="gradient"
                  size={68}
                  aria-label="Gradient action icon"
                  radius={100}
                  gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}>
                  <HiMiniUserGroup size={35} color={WARNA.biruTua} />
                </ActionIcon>
              </Center>
              <Center>
                <Text fz={15} c={WARNA.biruTua}>Divisi</Text>
              </Center>
            </Box>
            <Box onClick={() => router.push('/project')}>
              <Center>
                <ActionIcon variant="gradient"
                  size={68}
                  aria-label="Gradient action icon"
                  radius={100}
                  gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}>
                  <HiMiniPresentationChartBar size={35} color={WARNA.biruTua} />
                </ActionIcon>
              </Center>
              <Center>
                <Text fz={15} c={WARNA.biruTua}>Proyek</Text>
              </Center>
            </Box>
            <Box onClick={() => router.push('/announcement')}>
              <Center>
                <ActionIcon variant="gradient"
                  size={68}
                  aria-label="Gradient action icon"
                  radius={100}
                  gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}>
                  <HiMegaphone size={35} color={WARNA.biruTua} />
                </ActionIcon>
              </Center>
              <Center>
                <Text fz={15} c={WARNA.biruTua}>Pengumuman</Text>
              </Center>
            </Box>
            <Box onClick={() => router.push('/member')}>
              <Center>
                <ActionIcon variant="gradient"
                  size={68}
                  aria-label="Gradient action icon"
                  radius={100}
                  gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}>
                  <PiUsersFourFill size={35} color={WARNA.biruTua} />
                </ActionIcon>
              </Center>
              <Center>
                <Text fz={15} c={WARNA.biruTua}>Anggota</Text>
              </Center>
            </Box>
            <Box onClick={() => router.push('/group')}>
              <Center>
                <ActionIcon variant="gradient"
                  size={68}
                  aria-label="Gradient action icon"
                  radius={100}
                  gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}>
                  <HiUsers size={35} color={WARNA.biruTua} />
                </ActionIcon>
              </Center>
              <Center>
                <Text fz={15} c={WARNA.biruTua}>Group</Text>
              </Center>
            </Box>
            <Box onClick={() => router.push('/position')}>
              <Center>
                <ActionIcon variant="gradient"
                  size={68}
                  aria-label="Gradient action icon"
                  radius={100}
                  gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}>
                  <FaUserTie size={35} color={WARNA.biruTua} />
                </ActionIcon>
              </Center>
              <Center>
                <Text fz={15} c={WARNA.biruTua}>Jabatan</Text>
              </Center>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
