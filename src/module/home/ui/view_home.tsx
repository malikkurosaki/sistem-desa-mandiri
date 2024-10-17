"use client"
import { LayoutNavbarHome, TEMA, WARNA } from '@/module/_global';
import { Box, Group, Notification, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import Carosole from './carosole';
import Features from './features';
import IconNavbar from './icon_navbar';
import ListProjects from './list_project';
import ListDivisi from './list_divisi';
import ListDiscussion from './list_discussion';
import ListEventHome from './list_event';
import ChartProgressHome from './chart_progress_tugas';
import ChartDocumentHome from './chart_document';
import { useShallowEffect } from '@mantine/hooks';
import { notifications, Notifications } from '@mantine/notifications';
import { IoNotifications } from 'react-icons/io5';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { useHookstate } from '@hookstate/core';


export default function ViewHome() {
  const [isNotif, setIsNotif] = useState(true);
  const tema = useHookstate(TEMA)

  useShallowEffect(() => {
    if (isNotif) {
      notifications.show({
        color: tema.get().utama,
        title: <Text lineClamp={1}>Pengumuman Upacara bendera Upacara bendera Upacara bendera Upacara bendera</Text>,
        message: <Text lineClamp={1}>Upacara bendera Upacara bendera Upacara bendera Upacara bendera Upacara bendera</Text>,
        icon: <IoNotifications/>,
        loading: false,
        autoClose: 5000,
        position: "top-center",
        radius: 'lg',
        bg: "white",
        style: {
          border: `1px solid ${tema.get().utama}`,
        },
        onClose: () => setIsNotif(false)
      });
    }
  }, [isNotif]);
  return (
    <>
      <LayoutNavbarHome>
        <Group justify='space-between'>
          <Text fw={'bold'} c={'white'}>Perbekel Darmasaba</Text>
          <IconNavbar />
        </Group>
      </LayoutNavbarHome>
      <Box p={20}>
        <Stack >
          <Carosole />
          <Features />
          <ListProjects />
          <ListDivisi />
          <ChartProgressHome />
          <ChartDocumentHome />
          <ListEventHome />
          <ListDiscussion />
        </Stack>
      </Box>

    </>
  );
}

