"use client"
import { LayoutNavbarNew, TEMA } from '@/module/_global';
import { Box, Center, Flex, Grid, Group, Skeleton, Text, TextInput } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IDataCalender, IHistoryCalender } from '../lib/type_calender';
import { funGetAllCalender, funGetHostory } from '../lib/api_calender';
import { useMediaQuery, useShallowEffect } from '@mantine/hooks';
import moment from 'moment';
import "moment/locale/id";
import _ from 'lodash';
import { useHookstate } from '@hookstate/core';

export default function HistoryDivisionCalender() {
  const [isData, setData] = useState<IHistoryCalender[]>([])
  const router = useRouter()
  const param = useParams<{ id: string, detail: string }>()
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const tema = useHookstate(TEMA)


  const getData = async () => {
    try {
      setLoading(true)
      const response = await funGetHostory('?division=' + param.id + '&search=' + searchQuery)
      setData(response.data)
      setLoading(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  useShallowEffect(() => {
    getData()
  }, [searchQuery])

  const isMobile = useMediaQuery('(max-width: 450px)'); 

  return (
    <Box>
      <LayoutNavbarNew back={`/division/${param.id}/calender/`} title="Riwayat acara" menu />
      <Box p={20}>
        <TextInput
          styles={{
            input: {
              color: tema.get().utama,
              borderRadius: tema.get().utama,
              borderColor: tema.get().utama,
            },
          }}
          size="md"
          radius={30}
          leftSection={<HiMagnifyingGlass size={20} />}
          placeholder="Pencarian"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Box mt={30}>
          <Box bg={tema.get().bgTotalKegiatan} style={{
            borderRadius: 10,
            padding: 20
          }}>
            {loading ?
              Array(6)
                .fill(null)
                .map((_, i) => (
                  <Box key={i} mb={10}>
                    <Grid >
                      <Grid.Col span={2}>
                        <Flex justify={"center"} direction={'column'}>
                          <Skeleton height={30} width={"100%"} radius={"md"} />
                          <Skeleton height={20} width={"100%"} radius={"md"} mt={10} />
                        </Flex>
                      </Grid.Col>
                      <Grid.Col span={'auto'}>
                        {[...Array(1)].map((_, x) => (
                          <Box mb={10} key={x}>
                            <Skeleton height={20} width={"100%"} radius={"md"} />
                            <Skeleton height={20} width={"100%"} radius={"md"} mt={10} />
                          </Box>
                        ))}
                      </Grid.Col>
                    </Grid>
                  </Box>
                ))
              :
              _.isEmpty(isData)
              ?
              <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                 <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada history</Text>
              </Box>
              :
              isData.map((v, i) => {
                return (
                  <Grid key={i} 
                  style={{
                    alignContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}
                  >
                    <Grid.Col span={{
                      base: isMobile ? 4 : 3,
                      sm: 3,
                      xs:3,
                      md: 3,
                      lg: 3,
                      xl: 3
                    }}>
                      <Flex justify={"center"} direction={'column'}>
                        <Text ta={"center"} fz={20} fw={'bold'}>{moment(v.dateStart).format('D MMM')}</Text>
                        <Text ta={"center"} fz={15}>{moment(v.dateStart).format('dddd')}</Text>
                      </Flex>
                    </Grid.Col>
                    <Grid.Col span={{
                      base: isMobile ? 8 : 9,
                      md: 9,
                      lg: 9,
                      xl: 9,
                      sm: 9,
                      xs:9
                    }}>
                      {v.data.map((d, x) => {
                        return (
                          <Box mb={9} key={x}
                          onClick={() => router.push(`/division/${param.id}/calender/${d.id}`)}
                          >
                            <Text fw={"bold"} lineClamp={1}>{d.title}</Text>
                            <Text>{d.timeStart} | {d.timeEnd}</Text>
                          </Box>
                        )
                      })}
                    </Grid.Col>
                  </Grid>
                )
              })
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
