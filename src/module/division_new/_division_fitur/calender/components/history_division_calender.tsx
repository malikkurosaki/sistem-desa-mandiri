"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { Box, Center, Flex, Grid, Group, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const history = [
  {
    id: 1,
    tangal: 1,
    hari: "Sab",
    data: [
      {
        id: 1,
        judul: "Pembahasan Mengenai Darmasaba",
        waktu: "10.00 - 12.00",
        status: "Selesai",
      },
      {
        id: 2,
        judul: "Pembahasan Mengenai Darmasaba",
        waktu: "13.00 - 14.00",
      },
    ]
  },
  {
    id: 2,
    tangal: 2,
    hari: "Min",
    data: [
      {
        id: 1,
        judul: "Pembahasan Mengenai Darmasaba",
        waktu: "10.00 - 12.00",
      },
      {
        id: 1,
        judul: "Pembahasan Mengenai Darmasaba",
        waktu: "13.00 - 14.00",
      },
      {
        id: 1,
        judul: "Pembahasan Mengenai Darmasaba",
        waktu: "15.00 - 16.00",
      },
    ]
  },
]

export default function HistoryDivisionCalender() {
  const router = useRouter()
  return (
    <Box>
      <LayoutNavbarNew back="/calender" title="History kalender" menu />
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
        />
        <Box mt={30}>
          <Box bg={"#DBE9D8"} style={{
            borderRadius: 10
          }}>
            {history.map((v, i) => {
              return (
                <Grid key={i}>
                  <Grid.Col span={2}>
                    <Flex justify={"center"} direction={'column'}>
                      <Text ta={"center"} fz={20} fw={'bold'}>{v.tangal}</Text>
                      <Text ta={"center"} fz={15}>{v.hari}</Text>
                    </Flex>
                  </Grid.Col>
                  <Grid.Col span={'auto'}>
                    {v.data.map((value) => {
                      return (
                        <Box mb={10} key={value.id} onClick={() => router.push('/calender?page=detail-event')}>
                          <Text fw={"bold"}>{value.judul}</Text>
                          <Text>{value.waktu}</Text>
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
