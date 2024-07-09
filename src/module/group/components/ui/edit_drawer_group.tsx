'use client'
import { LayoutDrawer, WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { Box, Button, Center, Flex, Group, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { IoAddCircle, IoCloseCircleOutline } from "react-icons/io5";

export default function EditDrawerGroup({ onUpdated }: { onUpdated: (val: boolean) => void }) {
  const [openDrawerGroup, setOpenDrawerGroup] = useState(false)
  const [isModal, setModal] = useState(false)

  function onCLose() {
    setOpenDrawerGroup(false)
    onUpdated(true)
  }

  function onTrue(val: boolean) {
    if (val) {
      onUpdated(true)
    }
    setModal(false)
  }

  return (
    <Box>
      <Stack pt={10}>
        <SimpleGrid cols={{ base: 3, sm: 3, lg: 3 }}>
          <Flex justify={'center'} align={'center'} direction={'column'} onClick={() => setModal(true)} style={{ cursor: 'pointer' }}>
            <Box>
              <IoCloseCircleOutline size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Tidak Aktif</Text>
            </Box>
          </Flex>
          <Flex justify={'center'} align={'center'} direction={'column'} onClick={() => setOpenDrawerGroup(true)} style={{ cursor: 'pointer' }}>
            <Box>
              <IoAddCircle size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Edit</Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Stack>
      <LayoutDrawer opened={openDrawerGroup} onClose={() => setOpenDrawerGroup(false)} title={'Edit Grup'}>
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

      <LayoutModal opened={isModal} onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin mangubah status aktifasi data?"
        onYes={(val) => { onTrue(val) }} />
    </Box>
  );
}

