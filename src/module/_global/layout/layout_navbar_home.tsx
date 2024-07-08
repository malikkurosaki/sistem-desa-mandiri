import { Box, Grid, Group } from '@mantine/core';
import React from 'react';
import { WARNA } from '../fun/WARNA';

export const LayoutNavbarHome = ({ children }: { children: React.ReactNode }) => {
  return (
      <Box pt={25} pl={20} pr={20} m={0} pos={'sticky'} top={0} pb={25} bg={WARNA.biruTua}
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          zIndex: 100,
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
        }}
      >
        {children}
      </Box>
  );
}
export default LayoutNavbarHome