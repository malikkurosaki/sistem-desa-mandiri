import { WARNA } from '@/module/_global';
import { Box, Divider, Group, Indicator, Text } from '@mantine/core';
import { DatePicker, DatePickerProps } from '@mantine/dates';
import React from 'react';

const HariIni = [
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
]
const Besok = [
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
]

export default function DateEventDivision() {
  const dayRenderer: DatePickerProps['renderDay'] = (date) => {
    const day = date.getDate();
    return (
      <Indicator size={6} color="red" offset={-5} disabled={day !== 16}>
        <div>{day}</div>
      </Indicator>
    );
  };
  return (
    <Box>
      <Group
        justify="center"
        bg={"white"}
        py={20}
        style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
      >
        <DatePicker size='md' defaultValue={new Date()} renderDay={dayRenderer} />
      </Group>
      <Box>
        <Text mb={10} mt={20}  fw={"bold"}>Hari Ini</Text>
        {HariIni.map((event, index) => {
          const bgColor = ['#D8D8F1', '#FED6C5'][index % 2]
          const colorDivider = ['#535FCA', '#A7A7A7'][index % 2]
          return (
            <Box key={event.id} mt={10}>
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
        <Text mb={10} mt={20}  fw={"bold"}>16 Juli 2024</Text>
        {Besok.map((event, index) => {
          const bgColor = ['#D8D8F1', '#FED6C5'][index % 2]
          const colorDivider = ['#535FCA', '#A7A7A7'][index % 2]
          return (
            <Box key={event.id} mt={10}>
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
    </Box>
  );
}
