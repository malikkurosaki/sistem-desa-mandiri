"use client"
import { globalRole, LayoutDrawer, LayoutNavbarNew, WARNA } from '@/module/_global';
import { ActionIcon } from '@mantine/core';
import React, { useState } from 'react';
import { HiMenu } from "react-icons/hi";
import DrawerAnnouncement from './drawer_announcement';
import { useHookstate } from '@hookstate/core';

export default function NavbarAnnouncement() {
  const [isOpen, setOpen] = useState(false)
  const roleLogin = useHookstate(globalRole)

  return (
    <>
      <LayoutNavbarNew back='/home' title='pengumuman'
        menu={
          (roleLogin.get() != "user"  && roleLogin.get() != "coadmin") ?
            <ActionIcon onClick={() => setOpen(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
              <HiMenu size={20} color='white' />
            </ActionIcon>
            : <></>
        } />
      <LayoutDrawer opened={isOpen} title={'Menu'} onClose={() => setOpen(false)}>
        <DrawerAnnouncement />
      </LayoutDrawer>
    </>
  );
}

