"use client"
import { WARNA } from '@/module/_global';
import { ActionIcon, Box, Group } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiMagnifyingGlass, HiOutlineBell, HiOutlineUser } from 'react-icons/hi2';

export default function IconNavbar() {
  const router = useRouter()
  return (
    <Box>
      <Group>
        <ActionIcon onClick={() => router.push('/home?cat=search')} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
          <HiMagnifyingGlass size={20} color='white' />
        </ActionIcon>
        <ActionIcon onClick={() => router.push('/home?cat=notification')} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
          <HiOutlineBell size={20} color='white' />
        </ActionIcon>
        <ActionIcon onClick={() => router.push('/profile')} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
          <HiOutlineUser size={20} color='white' />
        </ActionIcon>
      </Group>
    </Box>
  );
}

