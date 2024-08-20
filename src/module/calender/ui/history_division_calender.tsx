"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { Box, Center, Flex, Grid, Group, Text, TextInput } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IDataCalender, IHistoryCalender } from '../lib/type_calender';
import { funGetAllCalender, funGetHostory } from '../lib/api_calender';
import { useShallowEffect } from '@mantine/hooks';
import moment from 'moment';
import "moment/locale/id";

const history = [
  {
    dateStart: "21",
    data: [
      {
        id: 1,
        title: "Pembahasan Mengenai Darmasaba",
        timeEnd: "10:00",
        timeStart: "10.00",
        status: "Selesai",
      },
      {
        id: 2,
        title: "Pembahasan Mengenai Darmasaba",
        timeEnd: "10:00",
        timeStart: "13.00 - 14.00",
      },
    ]
  },
  {
    dateStart: "21",
    data: [
      {
        id: 1,
        title: "Pembahasan Mengenai Darmasaba",
        timeEnd: "10:00",
        timeStart: "10.00",
      },
      {
        id: 1,
        title: "Pembahasan Mengenai Darmasaba",
        timeEnd: "10:00",
        timeStart: "13.00",
      },
      {
        id: 1,
        title: "Pembahasan Mengenai Darmasaba",
        timeEnd: "10:00",
        timeStart: "15.00",
      },
    ]
  },
]

export default function HistoryDivisionCalender() {
  const [isData, setData] = useState<IHistoryCalender[]>([])
  const router = useRouter()
  const param = useParams<{ id: string, detail: string }>()
  const [searchQuery, setSearchQuery] = useState('')

  const getData = async () => {
    try {
      const response = await funGetHostory('?division=' + param.id + '&search=' + searchQuery)
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useShallowEffect(() => {
    getData()
  }, [searchQuery])
  return (
    <Box>
      <LayoutNavbarNew back="/calender" title="Riwayat kalender" menu />
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Box mt={30}>
          <Box bg={"#DBE9D8"} style={{
            borderRadius: 10,
            padding: 20
          }}>
            {isData.map((v, i) => {
              return (
                <Grid key={i}>
                  <Grid.Col span={2}>
                      <Flex justify={"center"} direction={'column'}>
                        <Text ta={"center"} fz={20} fw={'bold'}>{moment(v.dateStart).format('D MMM')}</Text>
                        <Text ta={"center"} fz={15}>{moment(v.dateStart).format('dddd')}</Text>
                      </Flex>
                  </Grid.Col>
                  <Grid.Col span={'auto'}>
                    {v.data.map((d, x) => {
                      return (
                        <Box mb={10} key={x} >
                          <Text fw={"bold"}>{d.title}</Text>
                          <Text>{d.timeStart} | {d.timeEnd}</Text>
                        </Box>
                      )
                    })}
                  </Grid.Col>
                </Grid>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
