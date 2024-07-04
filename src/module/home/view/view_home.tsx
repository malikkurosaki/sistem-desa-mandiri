import { LayoutNavbarHome, WARNA } from '@/module/_global';
import { ActionIcon, Box, Group, rem, Stack, Text } from '@mantine/core';
import React from 'react';
import { HiMagnifyingGlass, HiOutlineBell, HiOutlineUser } from "react-icons/hi2";
import Carosole from '../components/carosole';
import Features from '../components/features';
// import { useRouter } from 'next/navigation';


export default function ViewHome() {
  // const router = useRouter()
  return (
    <>
      <LayoutNavbarHome>
        <Group justify='space-between'>
          <Text fw={'bold'} c={'white'} >Perbekal Darmasaba</Text>
          <Group>
            {/* <ActionIcon onClick={() => router.push('/search')} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
              <HiMagnifyingGlass size={20} color='white' />
            </ActionIcon> */}
            <ActionIcon variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
              <HiOutlineBell size={20} color='white' />
            </ActionIcon>
            <ActionIcon variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
              <HiOutlineUser size={20} color='white' />
            </ActionIcon>
          </Group>
        </Group>
      </LayoutNavbarHome>
      <Box p={20}>
        <Stack >
          <Carosole />
          <Features />
        </Stack>
      </Box>

    </>
  );
}

