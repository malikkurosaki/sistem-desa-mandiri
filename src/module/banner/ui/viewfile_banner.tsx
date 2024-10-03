import { LayoutNavbarNew } from '@/module/_global';
import { Box } from '@mantine/core';
import React from 'react';

function ViewfileBanner() {
  return (
    <Box>
      <LayoutNavbarNew back='/banner' title='View File Banner' menu={<></>}/>
    </Box>
  );
}

export default ViewfileBanner;
