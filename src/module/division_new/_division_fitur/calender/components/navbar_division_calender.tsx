'use client'
import { LayoutDrawer, LayoutNavbarNew, WARNA } from '@/module/_global';
import { ActionIcon, Box } from '@mantine/core';
import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import DawerDivisionCalender from './dawer_division_calender';
import DateEventDivision from './date_event_division';

export default function NavbarDivisionCalender() {
  const [openDrawer, setOpenDrawer] = useState(false)
  return (
    <div>
      <LayoutNavbarNew back="" title="Divisi - kalender"
        menu={
          <ActionIcon variant="light" onClick={() => setOpenDrawer(true)} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiMenu size={20} color='white' />
          </ActionIcon>
        }
      />
      <Box p={20}>
        <DateEventDivision/>
      </Box>
      <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
        <DawerDivisionCalender/>
      </LayoutDrawer>
    </div>
  );
}

