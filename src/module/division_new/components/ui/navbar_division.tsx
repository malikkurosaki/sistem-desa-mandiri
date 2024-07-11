'use client'
import { LayoutDrawer, LayoutNavbarNew, WARNA } from '@/module/_global';
import { ActionIcon, Avatar, Box, Card, Center, Divider, Flex, Grid, Group, Text, TextInput, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { HiMagnifyingGlass, HiMiniPresentationChartBar, HiMiniUserGroup, HiOutlineListBullet, HiSquares2X2 } from 'react-icons/hi2';
import { MdAccountCircle } from 'react-icons/md';
import DrawerDivision from './drawer_division';

const dataDivisi = [
  {
    id: 1,
    title: 'DIVISI 1',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
  },
  {
    id: 2,
    title: 'DIVISI 2',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
  },
  {
    id: 3,
    title: 'DIVISI 3',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
  },
  {
    id: 4,
    title: 'DIVISI 4',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
  },
  {
    id: 5,
    title: 'DIVISI5',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
  },
  {
    id: 6,
    title: 'DIVISI 6',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
  },
]

export default function NavbarDivision() {
  const [isList, setIsList] = useState(false)
  const router = useRouter()
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleList = () => {
    setIsList(!isList)
  }

  return (
    <Box>
      <LayoutNavbarNew back='/home' title='Divisi'
        menu={<ActionIcon variant="light" onClick={() => (setOpenDrawer(true))} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
          <HiMenu size={20} color='white' />
        </ActionIcon>} />
      <Box p={20}>
        <Grid justify='center' align='center'>
          <Grid.Col span={10}>
            <TextInput
              styles={{
                input: {
                  color: WARNA.biruTua,
                  borderRadius: '#A3A3A3',
                  borderColor: '#A3A3A3',
                },
              }}
              size="md"
              radius={30}
              leftSection={<HiMagnifyingGlass size={20} />}
              placeholder="Pencarian"
            />
          </Grid.Col>
          <Grid.Col span={'auto'}>
            <Flex justify={'center'}>
              {isList ? (
                <HiOutlineListBullet size={35} color={WARNA.biruTua} onClick={handleList} />
              ) : (
                <HiSquares2X2 size={35} color={WARNA.biruTua} onClick={handleList} />
              )}
            </Flex>
          </Grid.Col>
        </Grid>
        <Box pt={20}>
          <Box bg={WARNA.biruTua} p={10} style={{ borderRadius: 10 }}>
            <Text fw={'bold'} c={'white'}>Total Divisi</Text>
            <Flex justify={'center'} align={'center'} h={'100%'}>
              <Text fz={40} fw={'bold'} c={'white'}>35</Text>
            </Flex>
          </Box>
        </Box>
        {isList ? (
          <Box pt={20}>
            {dataDivisi.map((v, i) => {
              return (
                <Box key={i}>
                  <Group justify="space-between" mb={10} onClick={() => router.push(`/division/${v.id}`)}>
                    <Group>
                      <Center>
                        <ActionIcon
                          variant="gradient"
                          size={50}
                          aria-label="Gradient action icon"
                          radius={100}
                          gradient={{
                            from: '#DFDA7C',
                            to: '#F2AF46',
                            deg: 174
                          }}
                        >
                          <HiMiniUserGroup size={25} color={WARNA.biruTua} />
                        </ActionIcon>
                      </Center>
                      <Text>{v.title}</Text>
                    </Group>
                  </Group>
                  <Divider my="sm" />
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box pt={20}>
            {dataDivisi.map((v, i) => {
              return (
                <Box key={i} mb={20}>
                  <Card shadow="sm" padding="md" component="a" radius={10} onClick={() => router.push(`/division/${v.id}`)}>
                    <Card.Section>
                      <Box h={120} bg={WARNA.biruTua}>
                        <Flex justify={'center'} align={'center'} h={"100%"}>
                          <Title order={3} c={"white"}>{v.title}</Title>
                        </Flex>
                      </Box>
                    </Card.Section>
                    <Box pt={10}>
                      <Text>{v.description}</Text>
                      <Group align='center' pt={10} justify='flex-end'>
                        <Avatar.Group>
                          <Avatar>
                            <MdAccountCircle size={32} color={WARNA.biruTua} />
                          </Avatar>
                          <Avatar>+5</Avatar>
                        </Avatar.Group>
                      </Group>
                    </Box>
                  </Card>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
      <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
        <DrawerDivision/>
      </LayoutDrawer>
    </Box>
  );
}