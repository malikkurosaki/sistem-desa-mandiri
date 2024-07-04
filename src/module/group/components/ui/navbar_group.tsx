"use client"
import { isDrawer, LayoutDrawer, LayoutIconBack, LayoutNavbarHome, WARNA } from '@/module/_global';
import { ActionIcon, Box, Drawer, Grid, Group, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiMenu } from "react-icons/hi";
import DrawerGroup from './drawer_group';

export default function NavbarGroup() {
  const [openDrawer, setOpenDrawer] = useAtom(isDrawer)
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
              <ActionIcon onClick={() => setOpenDrawer(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
                <HiMenu size={20} color='white' />
              </ActionIcon>
            </Group>
          </Grid.Col>
        </Grid>
      </LayoutNavbarHome>
      <LayoutDrawer opened={openDrawer} title={'MENU'} onClose={() => setOpenDrawer(false)}>
        <DrawerGroup />
      </LayoutDrawer>
    </>
  );
}

