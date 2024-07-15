import { LayoutNavbarNew } from '@/module/_global';
import { ActionIcon, Box } from '@mantine/core';
import React from 'react';
import ListUlangiEvent from './list_ulangi_event';

export default function UlangiEvent() {
  return (
    <Box>
      <LayoutNavbarNew back='/calender/create' title='ulangi event' menu />
      <Box p={20}>
        <ListUlangiEvent />
      </Box>
    </Box>
  );
}