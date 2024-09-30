import { Box, Drawer, Text } from '@mantine/core';
import React from 'react';
import { WARNA } from '../fun/WARNA';
import { useHookstate } from '@hookstate/core';
import { TEMA } from '../bin/val_global';

export default function LayoutDrawer({ opened, onClose, title, children, size }: { children: React.ReactNode, opened: boolean, size?: string, onClose: () => void, title: React.ReactNode }) {
  const tema = useHookstate(TEMA)
  return (
    <Box>
      <Drawer opened={opened} title={<Text c={tema.get().utama} fw={'bold'}>{title}</Text>} onClose={onClose} position={"bottom"} size={(size == 'lg') ? '80%' : '40%' }
        styles={{
          content: {
            backgroundColor: "white",
            borderRadius: "20px 20px 0px 0px",
            maxWidth: 550,
            margin: "0 auto",
          },
        }}
      >
        {children}
      </Drawer>
    </Box>
  );
}
