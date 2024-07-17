import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { Box, Text, Title } from '@mantine/core';
import React from 'react';

export default function InformationDivision() {
  return (
    <Box>
      <LayoutNavbarNew back="/division/1" title=""
        menu
      />
      <Box p={20}>
        <Title order={3} fw={"bold"} ta={"center"}>DIVISI KEROHANIAN</Title>
        <Box mt={20}>
          <Text fw={"bold"}>Deskripsi</Text>
          <Box p={20} style={{
            border: `1px solid ${WARNA.borderBiruMuda}`,
            borderRadius: 10
          }}>
            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
