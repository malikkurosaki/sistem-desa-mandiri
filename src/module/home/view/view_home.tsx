import { LayoutNavbarHome } from '@/module/_global';
import { Box, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import Carosole from '../components/carosole';
import Features from '../components/features';
import IconNavbar from '../components/ui/icon_navbar';
import ListProjects from '../components/list_project';
import ListDivisi from '../components/list_divisi';
import ListEvent from '../components/list_event';


export default function ViewHome() {
  return (
    <>
      <LayoutNavbarHome>
        <Group justify='space-between'>
          <Text fw={'bold'} c={'white'} >Perbekal Darmasaba</Text>
          <IconNavbar />
        </Group>
      </LayoutNavbarHome>
      <Box p={20}>
        <Stack >
          <Carosole />
          <Features />
          <ListProjects />
          <ListDivisi />
          <ListEvent />
        </Stack>
      </Box>

    </>
  );
}

