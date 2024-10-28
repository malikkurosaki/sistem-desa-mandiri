"use client"
import { Box, Stack } from '@mantine/core';
import Carosole from './carosole';
import ChartDocumentHome from './chart_document';
import ChartProgressHome from './chart_progress_tugas';
import Features from './features';
import HeaderHome from './header_home';
import ListDiscussion from './list_discussion';
import ListDivisi from './list_divisi';
import ListEventHome from './list_event';
import ListProjects from './list_project';


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

