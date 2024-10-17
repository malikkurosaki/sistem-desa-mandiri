'use client'
import { LayoutDrawer, LayoutNavbarNew, TEMA } from '@/module/_global';
import { ActionIcon, Box } from '@mantine/core';
import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import DawerDivisionCalender from './dawer_division_calender';
import DateEventDivision from './date_event_division';
import { useParams } from 'next/navigation';
import { useHookstate } from '@hookstate/core';

export default function NavbarDivisionCalender() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const param = useParams<{ id: string }>()
  const tema = useHookstate(TEMA)
  return (
    <div>
      <LayoutNavbarNew back={`/division/${param.id}`} title="Kalender"
        menu={
          <ActionIcon variant="light" onClick={() => setOpenDrawer(true)} bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiMenu size={20} color='white' />
          </ActionIcon>
        }
      />
      <Box p={20}>
        <DateEventDivision />
      </Box>
      <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
        <DawerDivisionCalender />
      </LayoutDrawer>
    </div>
  );
}

