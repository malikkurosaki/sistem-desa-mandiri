"use client"
import { LayoutIconBack, LayoutNavbarHome } from '@/module/_global';
import { Box, Grid, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function NavbarNotification() {
  const router = useRouter()
  return (
    <Box>
      <LayoutNavbarHome>
        <Grid justify='center' align='center'>
          <Grid.Col span="auto">
            <LayoutIconBack back='/home' />
          </Grid.Col>
          <Grid.Col span={6}>
            <Text ta={'center'} fw={'bold'} c={'white'} >NOTIFIKASI</Text>
          </Grid.Col>
          <Grid.Col span="auto"></Grid.Col>
        </Grid>
      </LayoutNavbarHome>
    </Box>
  );
}

