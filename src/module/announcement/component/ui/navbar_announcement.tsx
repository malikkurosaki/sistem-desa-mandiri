"use client"
import { isDrawer, LayoutDrawer, LayoutIconBack, LayoutNavbarHome, WARNA } from '@/module/_global';
import { ActionIcon, Box, Drawer, Grid, Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiMenu } from "react-icons/hi";
import { useHookstate } from '@hookstate/core';
import DrawerAnnouncement from './drawer_announcement';

export default function NavbarAnnouncement() {
  const openDrawer = useHookstate(isDrawer)
  return (
    <>
      <LayoutNavbarHome>
        <Grid justify='center' align='center'>
          <Grid.Col span="auto">
            <LayoutIconBack back='/home' />
          </Grid.Col>
          <Grid.Col span={6}>
            <Text ta={'center'} fw={'bold'} c={'white'}>PENGUMUMAN</Text>
          </Grid.Col>
          <Grid.Col span="auto">
            <Group justify='flex-end'>
              <ActionIcon onClick={() => openDrawer.set(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
                <HiMenu size={20} color='white' />
              </ActionIcon>
            </Group>
          </Grid.Col>
        </Grid>
      </LayoutNavbarHome>
      <LayoutDrawer opened={openDrawer.get()} title={'MENU'} onClose={() => openDrawer.set(false)}>
        <DrawerAnnouncement />
      </LayoutDrawer>
    </>
  );
}

