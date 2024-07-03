'use client'
import { LayoutNavbarHome, WARNA } from '@/module/_global';
import { ActionIcon, Box, Grid, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiChevronLeft, HiMagnifyingGlass } from 'react-icons/hi2';

export default function ViewSearch() {
  const router = useRouter()
  return (
    <>
      <LayoutNavbarHome>
        <Grid justify='center' align='center'>
          <Grid.Col span="auto">
            <ActionIcon variant="light" onClick={() => router.push('/home')} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
              <HiChevronLeft size={20} color='white' />
            </ActionIcon>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text ta={'center'} fw={'bold'} c={'white'} >PENCARIAN</Text>
          </Grid.Col>
          <Grid.Col span="auto"></Grid.Col>
        </Grid>
      </LayoutNavbarHome>
      <Box p={20}>
        <TextInput
          styles={{
            input: {
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
            },
          }}
          size="md"
          radius={30}
          leftSection={<HiMagnifyingGlass size={20}/>}
          placeholder="Pencarian"
        />
      </Box>
    </>
  );
}

