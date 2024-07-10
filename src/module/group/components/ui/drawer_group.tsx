import { LayoutDrawer, WARNA } from '@/module/_global';
import { Box, Button, Center, Flex, Group, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { IoAddCircle } from "react-icons/io5";

export default function DrawerGroup({ onSuccess }: { onSuccess: (val: boolean) => void }) {
  const [openDrawerGroup, setOpenDrawerGroup] = useState(false)

  function onCLose() {
    setOpenDrawerGroup(false)
    onSuccess(true)
  }

  return (
    <Box>
      <Stack pt={10}>
        <SimpleGrid
          cols={{ base: 3, sm: 3, lg: 3 }}
          onClick={() => setOpenDrawerGroup(true)}
        >
          <Flex justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <IoAddCircle size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Tambah Group</Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Stack>
      <LayoutDrawer opened={openDrawerGroup} onClose={() => setOpenDrawerGroup(false)} title={'Tambah Grup'}>
        <Box pt={10}>
          <TextInput
            styles={{
              input: {
                color: WARNA.biruTua,
                borderRadius: WARNA.biruTua,
                borderColor: WARNA.biruTua,
              },
            }}
            size="lg"
            radius={10}
            placeholder="Grup"
          />
          <Box mt={'xl'}>
            <Button
              c={"white"}
              bg={WARNA.biruTua}
              size="lg"
              radius={30}
              fullWidth
              onClick={onCLose}
            >
              Simpan
            </Button>
          </Box>
        </Box>
      </LayoutDrawer>
    </Box>
  );
}
