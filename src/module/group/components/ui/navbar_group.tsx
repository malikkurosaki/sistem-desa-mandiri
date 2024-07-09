"use client"
import { LayoutDrawer, LayoutNavbarNew, WARNA } from '@/module/_global';
import { ActionIcon, } from '@mantine/core';
import React, { useState } from 'react';
import { HiMenu } from "react-icons/hi";
import DrawerGroup from './drawer_group';
import toast from 'react-hot-toast';

export default function NavbarGroup() {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <LayoutNavbarNew back='/home' title='Grup'
        menu={
          <ActionIcon onClick={() => setOpen(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiMenu size={20} color='white' />
          </ActionIcon>
        }
      />
      <LayoutDrawer opened={isOpen} title={'Menu'} onClose={() => setOpen(false)}>
        <DrawerGroup onSuccess={() => {
          setOpen(false)
          toast.success('Sukses! data tersimpan')
        }} />
      </LayoutDrawer>
    </>
  );
}

