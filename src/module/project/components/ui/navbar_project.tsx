"use client"
import { isDrawer, LayoutDrawer, LayoutNavbarNew, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Avatar, Badge, Box, Card, Center, Divider, Flex, Grid, Group, Text, TextInput, Title } from '@mantine/core';
import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { HiMagnifyingGlass, HiMiniPresentationChartBar, HiOutlineListBullet, HiSquares2X2 } from 'react-icons/hi2';
import { MdAccountCircle } from 'react-icons/md';
import { RiCircleFill } from "react-icons/ri";
import DrawerProject from './drawer_project';

const dataProject = [
  {
    id: 1,
    title: 'Project 1',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
    status: 'PROJECT SELESAI',
    color: '#387529'
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
    status: 'PROJECT SELESAI',
    color: '#387529'
  },
  {
    id: 3,
    title: 'Project 3',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
    status: 'PROJECT SELESAI',
    color: '#387529'
  },
  {
    id: 4,
    title: 'Project 4',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
    status: 'PROSES',
    color: '#C5771A'
  },
  {
    id: 5,
    title: 'Project5',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
    status: 'PROSES',
    color: '#C5771A'
  },
  {
    id: 6,
    title: 'Project 6',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
    status: 'PROSES',
    color: '#C5771A'
  },
]

export default function NavbarProject() {
  const [isList, setIsList] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleList = () => {
    setIsList(!isList)
  }
  return (
    <Box>
      <LayoutNavbarNew back='/home' title='proyek'
        menu={<ActionIcon variant="light" onClick={() => setOpenDrawer(true)} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
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
          <Box bg={"#DCEED8"} p={10} style={{ borderRadius: 10 }}>
            <Text fw={'bold'} c={WARNA.biruTua}>Total Proyek</Text>
            <Flex justify={'center'} align={'center'} h={'100%'}>
              <Text fz={40} fw={'bold'} c={WARNA.biruTua}>35</Text>
            </Flex>
          </Box>
          <Grid pt={15}>
            <Grid.Col span={6}>
              <Box bg={"#DCEED8"} p={10} style={{ borderRadius: 10 }}>
                <Text ta={'center'} fw={'bold'} c={'#387529'}>Proyek Selesai</Text>
                <Flex justify={'center'} align={'center'} h={'100%'}>
                  <Text fz={40} fw={'bold'} c={'#387529'}>35</Text>
                </Flex>
              </Box>
            </Grid.Col>
            <Grid.Col span={6}>
              <Box bg={"#DCEED8"} p={10} style={{ borderRadius: 10 }}>
                <Text ta={'center'} fw={'bold'} c={'#C5771A'}>Proyek Proses</Text>
                <Flex justify={'center'} align={'center'} h={'100%'}>
                  <Text fz={40} fw={'bold'} c={'#C5771A'}>35</Text>
                </Flex>
              </Box>
            </Grid.Col>
          </Grid>
          {isList ? (
            <Box pt={20}>
              {dataProject.map((v, i) => {
                return (
                  <Box key={i}>
                    <Group justify="space-between" mb={10}>
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
                            <HiMiniPresentationChartBar size={25} color={WARNA.biruTua} />
                          </ActionIcon>
                        </Center>
                        <Text>{v.title}</Text>
                      </Group>
                      <Box>
                        <RiCircleFill size={12} color={v.color} />
                      </Box>
                    </Group>
                    <Divider my="sm" />
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Box pt={20}>
              {dataProject.map((v, i) => {
                return (
                  <Box key={i}>
                    <Card shadow="sm" padding="md" component="a" radius={10}>
                      <Card.Section>
                        <Box h={120} bg={WARNA.biruTua}>
                          <Flex justify={'center'} align={'center'} h={"100%"}>
                            <Title order={3} c={"white"}>{v.title}</Title>
                          </Flex>
                        </Box>
                      </Card.Section>
                      <Box pt={10}>
                        <Text>{v.description}</Text>
                        <Group align='center' pt={10} justify='space-between'>
                          <Badge color={v.color}>{v.status}</Badge>
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
      </Box >
      <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
        <DrawerProject />
      </LayoutDrawer>
    </Box>
  );
}

