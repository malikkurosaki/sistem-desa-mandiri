'use client'
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { ActionIcon, Box, Center, SimpleGrid, Text } from '@mantine/core';
import React from 'react';
import { HiMiniUserGroup, HiMiniPresentationChartBar, HiMegaphone, HiSquares2X2, HiChevronLeft, HiUserGroup, HiUsers } from "react-icons/hi2";
import { PiUsersFourFill } from "react-icons/pi";
import { useRouter } from 'next/navigation';
import { FaUserTag, FaUserTie } from 'react-icons/fa6';

export default function ViewDetailFeature() {
  const router = useRouter()
  return (
    <>
      <LayoutNavbarNew back='/home' title='Fitur' menu={<></>} />
      <Box p={20}>
        <Box >
          <SimpleGrid
            cols={{ base: 4, sm: 4, lg: 4 }}
          >
            <Box onClick={() => router.push('/division')}>
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
            <Box onClick={() => router.push('position?active=true')}>
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
            <Box onClick={() => router.push('/group')}>
              <Center>
                <ActionIcon variant="gradient"
                  size={68}
                  aria-label="Gradient action icon"
                  radius={100}
                  gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}>
                  <FaUserTag size={35} color={WARNA.biruTua} />
                </ActionIcon>
              </Center>
              <Center>
                <Text fz={15} c={WARNA.biruTua}>Group</Text>
              </Center>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
