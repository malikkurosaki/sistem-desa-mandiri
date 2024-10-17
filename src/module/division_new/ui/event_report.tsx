import { Box, Divider, Group, ScrollArea, Stack, Text } from '@mantine/core';
import React from 'react';
import { IDataReportDivision } from '../lib/type_division';
import _ from 'lodash';
import { useRouter } from 'next/navigation';

export default function EventReport({ data, tgl }: { data: IDataReportDivision[], tgl: string }) {
  const router = useRouter()

  return (
    <Box>
      <Text mb={20} mt={10} ta={'center'} fw={"bold"}>EVENT <br /> {tgl}</Text>
      {
        _.isEmpty(data)
          ?
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
            <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada event</Text>
          </Box>
          :
          data.map((event, index) => {
            const bgColor = ['#D8D8F1', '#FED6C5'][index % 2]
            const colorDivider = ['#535FCA', '#A7A7A7'][index % 2]
            return (
              <Box key={event.id} mt={10}>
                <Box onClick={() => router.push(`/division/${event.idDivision}/calender/${event.id}`)} bg={bgColor} pl={15} p={10} style={{
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
          })
      }
    </Box>
  );
}