import { Box, Drawer, Text } from '@mantine/core';
import React from 'react';
import { WARNA } from '../fun/WARNA';

export default function LayoutDrawer({ opened, onClose, title, children }: { children: React.ReactNode, opened: boolean, onClose: () => void, title: React.ReactNode }) {
  return (
    <Box>
      <Drawer opened={opened} title={<Text c={WARNA.biruTua} fw={'bold'}>{title}</Text>} onClose={onClose} position={"bottom"} size={"35%"}
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
