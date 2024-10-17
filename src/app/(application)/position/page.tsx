import { ViewFilter } from '@/module/_global';
import { NavbarListPosition, TabListPosition } from '@/module/position';
import { Box } from '@mantine/core';
import React from 'react';

function Page({ searchParams }: { searchParams: { page: string } }) {
  if (searchParams.page == "filter")
    return <ViewFilter linkFilter='position' />

  return (
    <Box>
      <NavbarListPosition />
      <TabListPosition />
    </Box>
  );
}

export default Page;
