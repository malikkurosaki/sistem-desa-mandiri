"use client"
import { WARNA } from '@/module/_global';
import { ActionIcon, Avatar, Badge, Box, Card, Center, Divider, Flex, Grid, Group, Text, TextInput, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiMagnifyingGlass, HiMiniPresentationChartBar, HiOutlineListBullet, HiSquares2X2 } from 'react-icons/hi2';
import { MdAccountCircle } from 'react-icons/md';
import { RiCircleFill } from 'react-icons/ri';

const dataProject = [
  {
    id: 1,
    title: 'Project 1',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
    status: 'PROJECT BATAL',
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
    status: 'PROJECT BATAL',
  },
  {
    id: 3,
    title: 'Project 3',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
    status: 'PROJECT BATAL',
  },
  {
    id: 4,
    title: 'Project 4',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
    status: 'PROJECT BATAL',
  },
  {
    id: 5,
    title: 'Project 5',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
    status: 'PROJECT BATAL',
  },
  {
    id: 6,
    title: 'Project 6',
    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
    status: 'PROJECT BATAL',
  },
]
export default function ProjectCencel() {
  const [isList, setIsList] = useState(false)
  const router = useRouter()

  const handleList = () => {
    setIsList(!isList)
  }
  return (
    <Box mt={20}>
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
            <Text fw={'bold'} c={WARNA.biruTua}>Total Kegiatan</Text>
            <Flex justify={'center'} align={'center'} h={'100%'}>
              <Text fz={40} fw={'bold'} c={WARNA.biruTua}>35</Text>
            </Flex>
          </Box>
          {isList ? (
            <Box pt={20}>
              {dataProject.map((v, i) => {
                return (
                  <Box key={i}>
                    <Group justify="space-between" mb={10} onClick={() => router.push(`/project/${v.id}`)}>
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
                        <RiCircleFill size={12} color={'#B80C29'} />
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
                  <Box key={i} mb={20}>
                    <Card shadow="sm" padding="md" component="a" radius={10} onClick={() => router.push(`/project/${v.id}`)}>
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
                          <Badge color={'#B80C29'}>{v.status}</Badge>
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
  );
}
