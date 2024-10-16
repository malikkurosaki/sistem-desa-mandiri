import { keyWibu } from '@/module/_global';
import { Box, Divider, Flex, Grid, Group, Indicator, Skeleton, Text } from '@mantine/core';
import { DatePicker, DatePickerProps } from '@mantine/dates';
import { useMediaQuery, useSetState, useShallowEffect } from '@mantine/hooks';
import 'dayjs/locale/id';
import _ from 'lodash';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useWibuRealtime } from 'wibu-realtime';
import { funGetAllCalender, funGetIndicatorCalender } from '../lib/api_calender';
import { IDataCalender } from '../lib/type_calender';


export default function DateEventDivision() {
  const [isData, setData] = useState<IDataCalender[]>([])
  const [isListTgl, setListTgl] = useState<any[]>([])
  const router = useRouter()
  const param = useParams<{ id: string, detail: string }>()
  const [isDate, setDate] = useSetState<any>(moment().format('YYYY-MM-DD'))
  const [isMonth, setMonth] = useState<any>(moment().month() + 1)
  const [loading, setLoading] = useState(true)
  const isMobile = useMediaQuery('(max-width: 369px)');
  const [dataRealTime, setDataRealtime] = useWibuRealtime({
    WIBU_REALTIME_TOKEN: keyWibu,
    project: "sdm"
  })


  const getData = async (tgl: any, loading: boolean) => {
    try {
      setLoading(loading)
      const response = await funGetAllCalender('?division=' + param.id + '&date=' + tgl)
      if (response.success) {
        setData(response.data)
      } else {
        toast.error(response.message)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      toast.error("Gagal mendapatkan list acara")
    } finally {
      setLoading(false)
    }
  }

  const getIndicator = async (tgl: any) => {
    try {
      const response = await funGetIndicatorCalender('?division=' + param.id + '&date=' + tgl)
      if (response.success) {
        setListTgl(response.data)
      } else {
        setListTgl([])
        toast.error(response.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal mendapatkan list acara")
    }
  }

  async function changeMonth(value: any) {
    const monthKlik = moment(value).format('MM')
    if (monthKlik != isMonth) {
      setMonth(monthKlik)
      getIndicator(value)
    }
  }

  function change(val: Date) {
    const a: any = moment(new Date(val)).format('YYYY-MM-DD')
    setDate(a)
    getData(a, true)
  }


  useShallowEffect(() => {
    getData(isDate, true)
    getIndicator(isDate)
  }, [])


  const dayRenderer: DatePickerProps['renderDay'] = (date) => {
    const coba = moment(date).format('YYYY-MM-DD')
    const day = date.getDate()
    const muncul = isListTgl.includes(coba)

    return (
      <Indicator color="red" offset={-3} disabled={!muncul} position='top-end' inline size={6} >
        <div>{day}</div>
      </Indicator>
    );
  };

  useShallowEffect(() => {
    if (dataRealTime && dataRealTime.some((i: any) => i.category == 'calendar-event' && i.division == param.id && i.date == isDate)) {
      getIndicator(isDate)
      getData(isDate, false)
    } else if (dataRealTime && dataRealTime.some((i: any) => i.category == 'calendar-event' && i.division == param.id && i.date != isDate)) {
      getIndicator(isDate)
    }
  }, [dataRealTime])




  return (
    <Box>
      <Group
        justify="center"
        bg={"white"}
        py={20}
        style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
      >
        <DatePicker size='md'
          defaultValue={new Date()}
          renderDay={dayRenderer}
          onChange={(val: any) => { change(val) }}
          onDateChange={(val) => { changeMonth(val) }}
          locale='id'
        />
      </Group>
      <Box>
        <Text mb={10} mt={20} fw={"bold"}>
          Acara
        </Text>
        {loading ?
          Array(6)
            .fill(null)
            .map((_, i) => (
              <Box key={i} mb={10}>
                <Skeleton height={100} width={"100%"} radius={"md"} />
              </Box>
            ))
          :
          _.isEmpty(isData)
            ?
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
              <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada acara</Text>
            </Box>
            :
            isData.map((event, index) => {
              const bgColor = ['#D8D8F1', '#FED6C5'][index % 2]
              const colorDivider = ['#535FCA', '#A7A7A7'][index % 2]
              return (
                <Box key={event.id} mt={10}>
                  <Box onClick={() => router.push(`/division/${param.id}/calender/${event.id}`)} bg={bgColor} pl={15} p={10} style={{
                    borderRadius: 10
                  }} h={113}>
                    <Grid align='center'>
                      <Grid.Col span={{
                        base: 0.5,
                        xs: 0.5,
                        sm: 0.5,
                        md: 0.5,
                        lg: 0.5,
                        xl: 0.5,
                      }}>
                        <Divider h={92} size="lg" orientation="vertical" color={colorDivider} />
                      </Grid.Col>
                      <Grid.Col span={{
                        base: 11,
                        xs: 11,
                        sm: 11,
                        md: 11,
                        lg: 11,
                        xl: 11,
                      }}>
                        <Flex direction={'column'}>
                          <Text fz={isMobile ? 14 : 16}>{event.timeStart} - {event.timeEnd}</Text>
                          <Text fw={"bold"} lineClamp={1}>
                            {_.startCase(event.title)}
                          </Text>
                          <Text lineClamp={1}>
                            Dibuat oleh : {event.user_name}
                          </Text>
                        </Flex>
                      </Grid.Col>
                    </Grid>
                  </Box>
                </Box>
              )
            })
        }
      </Box>
    </Box>
  );
}
