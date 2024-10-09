"use client"
import { ReloadButtonTop } from '@/module/_global';
import { Box, Stack } from '@mantine/core';
import React from 'react';
import Carosole from './carosole';
import Features from './features';
import ListProjects from './list_project';
import ListDivisi from './list_divisi';
import ListDiscussion from './list_discussion';
import ListEventHome from './list_event';
import ChartProgressHome from './chart_progress_tugas';
import ChartDocumentHome from './chart_document';
import HeaderHome from './header_home';


export default function ViewHome() {

  return (
    <>
      <HeaderHome />
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

