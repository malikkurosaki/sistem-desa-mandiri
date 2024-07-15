import { LayoutNavbarNew } from '@/module/_global';
import { Box } from '@mantine/core';
import React from 'react';
import ListUlangiEvent from '../list_ulangi_event';

export default function UpdateUlangiEvent() {
  return (
    <Box>
      <LayoutNavbarNew back='/calender/update' title='ulangi event' menu />
      <Box p={20}>
        <ListUlangiEvent />
      </Box>
    </Box>
  );
}
