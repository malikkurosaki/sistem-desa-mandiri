"use client"
import { isDrawer, LayoutDrawer, LayoutIconBack, LayoutNavbarHome, WARNA } from '@/module/_global';
import { ActionIcon, Box, Drawer, Grid, Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiMenu } from "react-icons/hi";
import DrawerGroup from './drawer_group';
import { useHookstate } from '@hookstate/core';

export default function NavbarGroup() {
  const openDrawerMenu = useHookstate(isDrawer)
  const router = useRouter()
  return (
    <>
      <LayoutNavbarHome>
        <Grid justify='center' align='center'>
          <Grid.Col span="auto">
            <LayoutIconBack back='/home' />
          </Grid.Col>
          <Grid.Col span={6}>
            <Text ta={'center'} fw={'bold'} c={'white'}>GROUP</Text>
          </Grid.Col>
          <Grid.Col span="auto">
            <Group justify='flex-end'>
              <ActionIcon onClick={() => openDrawerMenu.set(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
                <HiMenu size={20} color='white' />
              </ActionIcon>
            </Group>
          </Grid.Col>
        </Grid>
      </LayoutNavbarHome>
      <LayoutDrawer opened={openDrawerMenu.get()} title={'MENU'} onClose={() => openDrawerMenu.set(false)}>
        <DrawerGroup />
      </LayoutDrawer>
    </>
  );
}

