"use client"
import { isDrawer, LayoutDrawer, LayoutNavbarNew, WARNA } from '@/module/_global';
import { ActionIcon } from '@mantine/core';
import React, { useState } from 'react';
import { HiMenu } from "react-icons/hi";
import { useHookstate } from '@hookstate/core';
import DrawerAnnouncement from './drawer_announcement';

export default function NavbarAnnouncement() {
  const openDrawer = useHookstate(isDrawer)
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <LayoutNavbarNew back='/home' title='pengumuman'
        menu={
          <ActionIcon onClick={() => setOpen(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiMenu size={20} color='white' />
          </ActionIcon>
        } />
      <LayoutDrawer opened={isOpen} title={'Menu'} onClose={() => setOpen(false)}>
        <DrawerAnnouncement />
      </LayoutDrawer>
    </>
  );
}

