'use client'
import { isDrawer, LayoutDrawer, WARNA } from '@/module/_global';
import { Box, Button, Center, Flex, Group, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { IoAddCircle } from "react-icons/io5";

export default function EditDrawerGroup() {
  // const [openDrawerGroup, setOpenDrawerGroup] = useState(false)
  // const [openDrawer, setOpenDrawer] = useAtom(isDrawer)

  // function onCLose() {
  //   setOpenDrawerGroup(false)
  //   setOpenDrawer(false)
  // }
  return (
    <Box>
      {/* <Stack pt={10}>
        <SimpleGrid
          cols={{ base: 3, sm: 3, lg: 3 }}
          onClick={() => setOpenDrawerGroup(true)}
        >
          <Flex justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <IoAddCircle size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Tidak Aktif</Text>
            </Box>
          </Flex>
          <Flex justify={'center'} align={'center'} direction={'column'} >
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
      </LayoutDrawer> */}
    </Box>
  );
}

