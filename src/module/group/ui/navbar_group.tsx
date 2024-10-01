"use client"
import { LayoutDrawer, LayoutNavbarNew, TEMA, WARNA } from '@/module/_global';
import { ActionIcon, } from '@mantine/core';
import React, { useState } from 'react';
import { HiMenu } from "react-icons/hi";
import DrawerGroup from './drawer_group';
import { useHookstate } from '@hookstate/core';

export default function NavbarGroup() {
  const [isOpen, setOpen] = useState(false)
  const tema = useHookstate(TEMA)
  return (
    <>
      <LayoutNavbarNew back='/home' title='Grup'
        menu={
          <ActionIcon onClick={() => setOpen(true)} variant="light" bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiMenu size={20} color='white' />
          </ActionIcon>
        }
      />
      <LayoutDrawer opened={isOpen} title={'Menu'} onClose={() => setOpen(false)}>
        <DrawerGroup onSuccess={() => { setOpen(false) }} />
      </LayoutDrawer>
    </>
  );
}

