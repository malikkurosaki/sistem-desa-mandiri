import { NavbarGroup, TabListGroup } from '@/module/group';
import { Box } from '@mantine/core';
import React from 'react';

function Page({ searchParams }: { searchParams: { active: string } }) {
  return (
    <Box>
      <NavbarGroup />
      <TabListGroup />
    </Box>
  );
}

export default Page;
