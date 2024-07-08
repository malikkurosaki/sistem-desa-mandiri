"use client"
import { isDrawer, LayoutDrawer, LayoutIconBack, LayoutNavbarHome, LayoutNavbarNew, WARNA } from '@/module/_global';
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
      <LayoutNavbarNew back='/home' title='pengumuman'
        menu={
          <ActionIcon onClick={() => openDrawer.set(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiMenu size={20} color='white' />
          </ActionIcon>
        } />
      <LayoutDrawer opened={openDrawer.get()} title={'MENU'} onClose={() => openDrawer.set(false)}>
        <DrawerAnnouncement />
      </LayoutDrawer>
    </>
  );
}

