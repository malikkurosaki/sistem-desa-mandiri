import { Box, Divider, Group, ScrollArea, Stack, Text } from '@mantine/core';
import React from 'react';

const dataEvent = [
  {
    id: 1,
    title: 'Pembahasan Mengenai Darmasaba',
    jamAwal: "10.00",
    jamAkhir: "11.00",
    dibuat: "Jhon"
  },
  {
    id: 2,
    title: 'Pembahasan Mengenai Darmasaba',
    jamAwal: "11.00",
    jamAkhir: "12.00",
    dibuat: "Jhon"
  },
  {
    id: 3,
    title: 'Pembahasan Mengenai Darmasaba',
    jamAwal: "13.00",
    jamAkhir: "14.00",
    dibuat: "Jhon"
  },
  {
    id: 4,
    title: 'Pembahasan Mengenai Darmasaba',
    jamAwal: "15.00",
    jamAkhir: "16.00",
    dibuat: "Jhon"
  },
]

export default function EventReport() {

  return (
    <Box>
      <Text mb={20} mt={10} ta={'center'} fw={"bold"}>EVENT SELESAI DILAKSANAKAN</Text>
      {dataEvent.map((event, index) => {
        const bgColor = ['#D8D8F1', '#FED6C5'][index % 2]
        const colorDivider = ['#535FCA', '#A7A7A7'][index % 2]
        return (
          <Box key={event.id} m={10}>
            <Box bg={bgColor} pl={15} p={10} style={{
              borderRadius: 10
            }} h={113}>
              <Group>
                <Divider h={92} size="lg" orientation="vertical" color={colorDivider} />
                <Box>
                  <Text>{event.jamAwal} - {event.jamAkhir}</Text>
                  <Text fw={"bold"}>{event.title}</Text>
                  <Text>Dibuat oleh : {event.dibuat}</Text>
                </Box>
              </Group>
            </Box>
          </Box>
        )
      })}
    </Box>
  );
}
