import { LayoutNavbarHome } from '@/module/_global';
import { Box, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import Carosole from './carosole';
import Features from './features';
import IconNavbar from './icon_navbar';
import ListProjects from './list_project';
import ListDivisi from './list_divisi';
import ListDiscussion from './list_discussion';
import ListEventHome from './list_event';
import ChartProgressHome from './chart_progress_tugas';
import ChartDocumentHome from './chart_document';


export default function ViewHome() {
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

