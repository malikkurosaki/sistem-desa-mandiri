import React from 'react';
import NavbarGroup from '../components/ui/navbar_group';
import { Box } from '@mantine/core';
import ListGroupActive from '../components/list_group_active';
import TabListGroup from '../components/tab_list_group';

export default function ViewGroup() {
  return (
    <Box>
      <NavbarGroup />
      <TabListGroup/>
    </Box>
  );
}

