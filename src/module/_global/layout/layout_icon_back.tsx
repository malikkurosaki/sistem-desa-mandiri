'use client'
import { ActionIcon, Box } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiChevronLeft } from 'react-icons/hi2';
import { WARNA } from '../fun/WARNA';

function LayoutIconBack({ back }: { back: string }) {
  const router = useRouter()
  return (
    <Box>
      <ActionIcon variant="light" onClick={() => router.push(back)} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
        <HiChevronLeft size={20} color='white' />
      </ActionIcon>
    </Box>
  );
}

export default LayoutIconBack;
