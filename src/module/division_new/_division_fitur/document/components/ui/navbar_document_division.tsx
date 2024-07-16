'use client'
import { LayoutDrawer, LayoutNavbarNew, WARNA } from '@/module/_global';
import { ActionIcon, Box, Checkbox, Divider, Flex, Grid, Group, Text } from '@mantine/core';
import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import DrawerMenuDocumentDivision from './drawer_menu_document_division';
import ListDocumentsDivision from '../list_documents_division';
import { FcDocument, FcFolder, FcImageFile } from 'react-icons/fc';

const dataDocuments = [
  {
    id: 1,
    name: 'Administrasi',
    date: '18/06/2024 14.00 PM',
    icon: <FcFolder size={60} />
  },
  {
    id: 2,
    name: 'Administrasi',
    date: '18/06/2024 14.00 PM',
    icon: <FcFolder size={60} />
  },
  {
    id: 3,
    name: 'Administrasi',
    date: '18/06/2024 14.00 PM',
    icon: <FcFolder size={60} />
  },
  {
    id: 3,
    name: 'Berkas Kerja',
    date: '18/06/2024 14.00 PM',
    icon: <FcDocument size={60} />
  },
  {
    id: 3,
    name: 'Berkas Kerja',
    date: '18/06/2024 14.00 PM',
    icon: <FcDocument size={60} />
  },
  {
    id: 3,
    name: 'Image Kegiatan',
    date: '18/06/2024 14.00 PM',
    icon: <FcImageFile size={60} />
  },
  {
    id: 3,
    name: 'Image Pelaksanaan',
    date: '18/06/2024 14.00 PM',
    icon: <FcImageFile size={60} />
  },
  {
    id: 3,
    name: 'Image Pelaksanaan',
    date: '18/06/2024 14.00 PM',
    icon: <FcImageFile size={60} />
  },
]

export default function NavbarDocumentDivision() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [isOpen, setOpen] = useState(false)
  return (
    <Box>
      {isChecked && (
        <>
          <Box h={90} w={{ base: "100%", md: "38.2%" }} bg={WARNA.biruTua} pos={'fixed'} top={0} style={{
            zIndex: 999,
          }}>
            zxsdsd
          </Box>
          <Box h={70} w={{ base: "100%", md: "38.2%" }} bg={WARNA.biruTua} pos={'fixed'} bottom={0} style={{
            zIndex: 999,
          }}>
            zxsdsd
          </Box>
        </>
      )}
      <LayoutNavbarNew back='/division' title='Divisi kerohanian'
        menu={
          <ActionIcon onClick={() => setOpen(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiMenu size={20} color='white' />
          </ActionIcon>
        }
      />
      <Box>
        <Box p={20} pb={60}>
          {dataDocuments.map((v, i) => {
            return (
              <Box key={i}>
                <Box mt={10} mb={10}>
                  <Grid align='center'>
                    <Grid.Col span={10}>
                      <Group gap={20}>
                        <Box>
                          {v.icon}
                        </Box>
                        <Flex direction={'column'}>
                          <Text>{v.name}</Text>
                          <Text fz={10}>{v.date}</Text>
                        </Flex>
                      </Group>
                    </Grid.Col>
                    <Grid.Col span={2}>
                      <Group justify='flex-end'>
                        <Checkbox
                          color="teal"
                          radius="lg"
                          size="md"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                      </Group>
                    </Grid.Col>
                  </Grid>
                </Box>
                <Divider size="xs" />
              </Box>
            )
          })}
        </Box>
      </Box>
      <LayoutDrawer opened={isOpen} title={'Menu'} onClose={() => setOpen(false)}>
        <DrawerMenuDocumentDivision />
      </LayoutDrawer>
    </Box>
  );
}
