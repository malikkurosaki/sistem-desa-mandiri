import { LayoutNavbarHome } from '@/module/_global';
import { Group, Text } from '@mantine/core';
import React from 'react';

export default function ViewHome() {
  return (
    <>
      <LayoutNavbarHome>
        <Group justify='space-between'>
        <Text fw={'bold'} c={'white'} >Perbekal Darmasaba</Text>
        <Text fw={'bold'} c={'white'} >icon</Text>
        </Group>
      </LayoutNavbarHome>
    </>
  );
}

