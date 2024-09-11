'use client'
import { WARNA } from '@/module/_global';
import { ActionIcon, Box, Center, Grid, SimpleGrid, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiMiniUserGroup, HiMiniPresentationChartBar, HiMegaphone, HiSquares2X2 } from "react-icons/hi2";

export default function Features() {
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 369px)');
  return (
    <>
      <Box pt={10}>
        <Text c={WARNA.biruTua} mb={10} fw={'bold'} fz={16}>Features</Text>
        <SimpleGrid
          cols={{ base: 4, sm: 4, lg: 4 }}
        >
          <Box onClick={() => router.push('/division')}>
            <Center>
              <ActionIcon variant="gradient"
                size={isMobile ? 50 : 68}
                aria-label="Gradient action icon"
                radius={100}
                gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}>
                <HiMiniUserGroup size={isMobile ? 25 : 35} color={WARNA.biruTua} />
              </ActionIcon>
            </Center>
            <Center>
              <Text fz={isMobile ? 13 : 15} c={WARNA.biruTua}>Divisi</Text>
            </Center>
          </Box>
          <Box onClick={() => router.push('/project?status=0&group=null')}>
            <Center>
              <ActionIcon variant="gradient"
                size={isMobile ? 50 : 68}
                aria-label="Gradient action icon"
                radius={100}
                gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}>
                <HiMiniPresentationChartBar size={isMobile ? 25 : 35} color={WARNA.biruTua} />
              </ActionIcon>
            </Center>
            <Center>
              <Text fz={isMobile ? 13 : 15} c={WARNA.biruTua}>Kegiatan</Text>
            </Center>
          </Box>
          <Box onClick={() => router.push('/announcement')}>
            <Center>
              <ActionIcon variant="gradient"
                size={isMobile ? 50 : 68}
                aria-label="Gradient action icon"
                radius={100}
                gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}>
                <HiMegaphone size={isMobile ? 25 : 35} color={WARNA.biruTua} />
              </ActionIcon>
            </Center>
            <Center>
              <Text fz={isMobile ? 13 : 15} c={WARNA.biruTua}>Pengumuman</Text>
            </Center>
          </Box>
          <Box onClick={() => router.push('/home?cat=fitur')}>
            <Center>
              <ActionIcon variant="gradient"
                size={isMobile ? 50 : 68}
                aria-label="Gradient action icon"
                radius={100}
                gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}>
                <HiSquares2X2 size={isMobile ? 25 : 35} color={WARNA.biruTua} />
              </ActionIcon>
            </Center>
            <Center>
              <Text fz={isMobile ? 13 : 15} c={WARNA.biruTua}>Semua</Text>
            </Center>
          </Box>
        </SimpleGrid>
      </Box>

    </>
  );
}

