import { LayoutNavbarHome, WARNA } from '@/module/_global';
import { ActionIcon, Box, Center, Grid, Group, SimpleGrid, Text } from '@mantine/core';
import React from 'react';
import { HiMiniUserGroup, HiMiniPresentationChartBar, HiMegaphone, HiSquares2X2, HiChevronLeft, HiUserGroup, HiUsers } from "react-icons/hi2";
import { PiUsersFourFill } from "react-icons/pi";
import { FaUsersRays, FaUserTie } from "react-icons/fa6";

export default function ViewDetailFeature() {
  return (
    <>
      <LayoutNavbarHome>
        <Group >
          <ActionIcon variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiChevronLeft size={20} color='white' />
          </ActionIcon>
          <Text fw={'bold'} c={'white'} >Semua Fitur</Text>
        </Group>
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
            <Box>
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
            <Box>
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
            <Box>
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
            <Box>
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
            <Box>
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
