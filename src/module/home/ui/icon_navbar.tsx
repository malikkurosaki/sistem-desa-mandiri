"use client"
import { TEMA, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Box, Group, Indicator, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiMagnifyingGlass, HiOutlineBell, HiOutlineUser } from 'react-icons/hi2';

export default function IconNavbar() {
  const router = useRouter()
  const tema = useHookstate(TEMA)
  return (
    <Box>
      <Group>
        <ActionIcon onClick={() => router.push('/home?cat=search')} variant="light" bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
          <HiMagnifyingGlass size={20} color='white' />
        </ActionIcon>
        <Indicator inline label={"9"} size={18} color={"red"} offset={3}>
        <ActionIcon onClick={() => router.push('/home?cat=notification')} variant="light" bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiOutlineBell size={20} color='white' />
        </ActionIcon>
          </Indicator>
        <ActionIcon onClick={() => router.push('/profile')} variant="light" bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
          <HiOutlineUser size={20} color='white' />
        </ActionIcon>
      </Group>
    </Box>
  );
}

