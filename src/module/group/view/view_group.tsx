import React from 'react';
import NavbarGroup from '../components/ui/navbar_group';
import { Box } from '@mantine/core';
import ListGroup from '../components/list_group';

export default function ViewGroup() {
  return (
    <Box>
      <NavbarGroup />
      <ListGroup />
    </Box>
  );
}

