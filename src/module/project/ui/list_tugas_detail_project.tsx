'use client'
import { WARNA } from '@/module/_global';
import { Box, Center, Checkbox, Divider, Grid, Group, SimpleGrid, Text } from '@mantine/core';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineFileSync } from 'react-icons/ai';
import { funGetOneProjectById } from '../lib/api_project';
import { useParams } from 'next/navigation';
import { useShallowEffect } from '@mantine/hooks';
import { IDataListTaskProject } from '../lib/type_project';

export default function ListTugasDetailProject() {
  const [isData, setData] = useState<IDataListTaskProject[]>([])
  const [loading, setLoading] = useState(true)
  const param = useParams<{ id: string }>()

  async function getOneData() {
    try {
      setLoading(true)
      const res = await funGetOneProjectById(param.id, 'task');
      if (res.success) {
        setData(res.data)
      } else {
        toast.error(res.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan list tugas proyek, coba lagi nanti");
    } finally {
      setLoading(false)
    }
  }

  useShallowEffect(() => {
    getOneData();
  }, [param.id])

  return (
    <>
      <Box pt={20}>
        <Text fw={"bold"} c={WARNA.biruTua}>
          Tanggal & Tugas
        </Text>
        <Box
          bg={"white"}
          style={{
            borderRadius: 10,
            border: `1px solid ${"#D6D8F6"}`,
            padding: 20,
          }}
        >
          {
            loading ? <Text>loading</Text> :
              isData.length === 0 ? <Text>Tidak ada tugas</Text> :
                isData.map((item, index) => {
                  return (
                    <Box key={index}>
                      <Grid
                        onClick={() => {
                          // setIdData(item.id)
                          // setStatusData(item.status)
                          // setOpenDrawer(true)
                        }}
                      >
                        <Grid.Col span={"auto"}>
                          <Center>
                            <Checkbox color="teal" size="md" checked={(item.status === 1) ? true : false} disabled />
                          </Center>
                        </Grid.Col>
                        <Grid.Col span={10}>
                          <Box
                            style={{
                              borderRadius: 10,
                              border: `1px solid ${"#D6D8F6"}`,
                              padding: 10,
                            }}
                          >
                            <Group>
                              <AiOutlineFileSync size={25} />
                              <Text>{item.name}</Text>
                            </Group>
                          </Box>
                          <Box>
                            <SimpleGrid cols={{ base: 2, sm: 2, lg: 2 }} mt={20}>
                              <Box>
                                <Text>Tanggal Mulai</Text>
                                <Group
                                  justify="center"
                                  bg={"white"}
                                  h={45}
                                  style={{
                                    borderRadius: 10,
                                    border: `1px solid ${"#D6D8F6"}`,
                                  }}
                                >
                                  <Text>{item.dateStart}</Text>
                                </Group>
                              </Box>
                              <Box>
                                <Text c={WARNA.biruTua}>Tanggal Berakhir</Text>
                                <Group
                                  justify="center"
                                  bg={"white"}
                                  h={45}
                                  style={{
                                    borderRadius: 10,
                                    border: `1px solid ${"#D6D8F6"}`,
                                  }}
                                >
                                  <Text>{item.dateEnd}</Text>
                                </Group>
                              </Box>
                            </SimpleGrid>
                          </Box>
                        </Grid.Col>
                      </Grid>
                      <Divider my={"lg"}/>
                    </Box>
                  )
                })
          }
        </Box>
      </Box>
    </>
  );
}

