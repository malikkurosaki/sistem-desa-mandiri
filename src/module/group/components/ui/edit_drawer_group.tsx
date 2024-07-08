'use client'
import { isDrawer, LayoutDrawer, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { Box, Button, Center, Flex, Group, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { IoAddCircle, IoCloseCircleOutline } from "react-icons/io5";

export default function EditDrawerGroup() {
  const [openDrawerGroup, setOpenDrawerGroup] = useState(false)
  const openDrawerEdit = useHookstate(isDrawer)

  function onCLose() {
    setOpenDrawerGroup(false)
    openDrawerEdit.set(false)
  }
  return (
    <Box>
      <Stack pt={10}>
        <SimpleGrid
          cols={{ base: 3, sm: 3, lg: 3 }}
          
        >
          <Flex justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <IoCloseCircleOutline size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Tidak Aktif</Text>
            </Box>
          </Flex>
          <Flex justify={'center'} align={'center'} direction={'column'} onClick={() => setOpenDrawerGroup(true)}>
            <Box>
              <IoAddCircle size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Edit</Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Stack>
      <LayoutDrawer opened={openDrawerGroup} onClose={() => setOpenDrawerGroup(false)} title={'EDIT GRUP'}>
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
            placeholder="Edit Grup"
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
              EDIT
            </Button>
          </Box>
        </Box>
      </LayoutDrawer>
    </Box>
  );
}

