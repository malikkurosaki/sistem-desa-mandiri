import { WARNA } from '@/module/_global';
import { Box, Divider, Group, Indicator, Text } from '@mantine/core';
import { DatePicker, DatePickerProps } from '@mantine/dates';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { funGetAllCalender } from '../lib/api_calender';
import { useShallowEffect } from '@mantine/hooks';
import { IDataCalender } from '../lib/type_calender';


export default function DateEventDivision() {
  const[isData, setData] = useState<IDataCalender[]>([])
  const router = useRouter()
  const param = useParams<{ id: string, detail: string }>()

  const getData = async () => {
    try {
      const response = await funGetAllCalender('?division=' + param.id)
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useShallowEffect(() => {
    getData()
  }, [])


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
        {isData.map((event, index) => {
          const bgColor = ['#D8D8F1', '#FED6C5'][index % 2]
          const colorDivider = ['#535FCA', '#A7A7A7'][index % 2]
          return (
            <Box key={event.id} mt={10}>
              <Box onClick={() => router.push(`/division/${param.id}/calender/${event.id}`)} bg={bgColor} pl={15} p={10} style={{
                borderRadius: 10
              }} h={113}>
                <Group>
                  <Divider h={92} size="lg" orientation="vertical" color={colorDivider} />
                  <Box>
                    <Text>{event.timeStart} - {event.timeEnd}</Text>
                    <Text fw={"bold"}>{event.title}</Text>
                    <Text>Dibuat oleh : {event.user_name}</Text>
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
