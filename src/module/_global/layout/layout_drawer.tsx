import { Box, Drawer, Text } from '@mantine/core';
import React from 'react';
import { WARNA } from '../fun/WARNA';

export default function LayoutDrawer({ opened, onClose, title, children, size }: { children: React.ReactNode, opened: boolean, size?: string, onClose: () => void, title: React.ReactNode }) {
  return (
    <Box>
      <Drawer opened={opened} title={<Text c={WARNA.biruTua} fw={'bold'}>{title}</Text>} onClose={onClose} position={"bottom"} size={(size == 'lg') ? '80%' : '30%'}
        styles={{
          content: {
            backgroundColor: "white",
            borderRadius: "20px 20px 0px 0px",
          },
        }}
      >
        {children}
      </Drawer>
    </Box>
  );
}
