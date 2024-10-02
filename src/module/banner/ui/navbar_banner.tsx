'use client'
import { LayoutDrawer, LayoutNavbarNew, TEMA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, rem } from '@mantine/core';
import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import DrawerBanner from './drawer_banner';

function NavbarBanner() {
  const [isOpen, setOpen] = useState(false)
  const tema = useHookstate(TEMA)
  return (
    <>
      <LayoutNavbarNew back='/home' title='Banner'
        menu={
          <ActionIcon onClick={() => setOpen(true)} variant="light" bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiMenu size={20} color='white' />
          </ActionIcon>
        }
      />
      <LayoutDrawer opened={isOpen} title={'Menu'} onClose={() => setOpen(false)}>
        <DrawerBanner onSuccess={() => { setOpen(false) }} />
      </LayoutDrawer>
    </>
  );
}

export default NavbarBanner;
