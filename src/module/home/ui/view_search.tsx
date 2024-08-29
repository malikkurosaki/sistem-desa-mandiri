"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { ActionIcon, Box, Divider, Grid, Group, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { HiMagnifyingGlass, HiMiniUser } from 'react-icons/hi2';
import { funGetSearchAll } from '../lib/api_search';
import { useShallowEffect } from '@mantine/hooks';
import { IDataDivisionSearch, IDataProjectSearch, IDataUserSearch } from '../lib/type_search';

export default function ViewSearch() {
  const [search, setSearch] = useState('');
  const [dataUser, setDataUser] = useState<IDataUserSearch[]>([]);
  const [dataProject, setDataProject] = useState<IDataDivisionSearch[]>([]);
  const [dataDivision, setDataDivision] = useState<IDataProjectSearch[]>([]);

  async function featchSearch() {
    try {
      const res = await funGetSearchAll('?search=' + search);
      setDataUser(res.data.user);
      setDataProject(res.data.project);
      setDataDivision(res.data.division);
    } catch (error) {
      console.error(error)
      throw new Error("Error")
    }
  }

  useShallowEffect(() => {
    if (search !== '') {
      featchSearch()
    }
  }, [search])

  return (
    <>
      <LayoutNavbarNew back='/home' title='Pencarian' menu={<></>} />
      <Box p={20}>
        <TextInput
          styles={{
            input: {
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
            },
          }}
          size="md"
          radius={30}
          leftSection={<HiMagnifyingGlass size={20} />}
          placeholder="Pencarian"
          onChange={(e) => setSearch(e.target.value)}
        />
        {dataUser.length || dataProject.length || dataDivision.length > 0 ? (

          <Box pt={20}>
            <Box style={{
              border: `1px solid ${WARNA.borderBiruMuda}`,
              padding: 10,
              borderRadius: 10,
            }}>
              <Text>ANGGOTA</Text>
              {dataUser.length > 0 ? (
                <Box>
                  {dataUser.map((v, i) => {
                    return (
                      <Box key={i}>
                        <Group align='center' style={{
                          padding: 10,
                        }} >
                          <Box>
                            <ActionIcon variant="light" bg={WARNA.biruTua} size={50} radius={100} aria-label="icon">
                              <HiMiniUser color={'white'} size={25} />
                            </ActionIcon>
                          </Box>
                          <Box>
                            <Text fw={'bold'} c={WARNA.biruTua}>{v.name}</Text>
                            <Text fw={'lighter'} fz={12}>{v.email}</Text>
                          </Box>
                        </Group>
                        <Divider my={5} />
                      </Box>
                    )
                  })}
                </Box>
              ) :
                <Text>Tidak Ada Anggota</Text>
              }
              <Box mt={10}>
                <Text>DIVISI</Text>
                <Box style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: `#E7EBF1`,
                  borderRadius: 5
                }}>
                  {dataDivision.length > 0 ? (
                    <Box>
                      {dataDivision.map((v, i) => {
                        return (
                          <Box key={i}>
                            <Grid justify='center' align='center' mt={15}>
                              <Grid.Col span={"auto"}>
                                <ActionIcon variant="light" bg={WARNA.biruTua} size={50} radius={100} aria-label="icon">
                                  <HiMiniUser color={'white'} size={25} />
                                </ActionIcon>
                              </Grid.Col>
                              <Grid.Col span={10}>
                                <Text fw={'bold'} c={WARNA.biruTua}>{v.name.toUpperCase()}</Text>
                              </Grid.Col>
                            </Grid>
                            <Text fw={'lighter'} mt={5} mb={10} lineClamp={2}>{v.desc}</Text>
                            <Divider my={5} />
                          </Box>
                        )
                      })}
                    </Box>
                  ) :
                    <Text>Tidak Ada Divisi</Text>
                  }
                </Box>
              </Box>
              <Box mt={10}>
                <Text>KEGIATAN</Text>
                <Box style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: `#E7EBF1`,
                  borderRadius: 5
                }}>
                  {dataProject.length > 0 ? (
                  <Box>
                    {dataProject.map((v, i) => {
                      return (
                        <Box key={i}>
                          <Grid justify='center' align='center' mt={10}>
                            <Grid.Col span={"auto"}>
                              <ActionIcon variant="light" bg={WARNA.biruTua} size={50} radius={100} aria-label="icon">
                                <HiMiniUser color={'white'} size={25} />
                              </ActionIcon>
                            </Grid.Col>
                            <Grid.Col span={10}>
                              <Text fw={'bold'} c={WARNA.biruTua}>{v.title.toUpperCase()}</Text>
                            </Grid.Col>
                          </Grid>
                          <Divider mt={10} />
                        </Box>
                      )
                    })}
                  </Box>
                  )
                  : <Text>Tidak Ada Kegiatan</Text>
                }
                </Box>
              </Box>
            </Box>
          </Box>
        )
          : null
        }
      </Box>
    </>
  );
}

