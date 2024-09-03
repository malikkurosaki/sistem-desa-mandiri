"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { Box, Skeleton, Stack } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import React, { useState } from 'react';
import EchartPaiReport from './echart_pai_report';
import EchartBarReport from './echart_bar_report';
import EventReport from './event_report';
import DiscussionReport from './discussion_report';
import { useParams } from 'next/navigation';
import { funGetReportDivision } from '../lib/api_division';
import moment from 'moment';
import "moment/locale/id";
import toast from 'react-hot-toast';


export default function ReportDivisionId() {
  const [value, setValue] = useState<Date | null>(null);
  const param = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false);
  const [tampil, setTampil] = useState(false);
  const [report, setReport] = useState({
    progress: [],
    dokumen: [],
    event: [],
  })

  async function onReport(date: any) {
    try {
      setReport({
        progress: [],
        dokumen: [],
        event: [],
      })
      setTampil(true)
      setLoading(true)
      const res = await funGetReportDivision(`?division=${param.id}&date=${moment(date).format("YYYY-MM-DD")}`)
      if (res.success) {
        setReport(res.data)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Gagal mendapatkan data, coba lagi nanti");
    } finally {
      setLoading(false)
    }
  }

  function onChangeDate(val: any) {
    if (val != null && val != "") {
      onReport(val)
    }
    setValue(val)
  }


  return (
    <Box>
      <LayoutNavbarNew back={`/division/${param.id}`} title="Laporan Divisi" menu />
      <Box p={20}>
        <Stack>
          <DateInput
            value={value}
            onChange={(val) => { onChangeDate(val) }}
            radius={10}
            size="md"
            required
            label="Tanggal"
            placeholder="Tanggal"
          />
          {
            tampil &&
            <>
              {
                loading ?
                  <>
                    <Box pb={20}>
                      <Skeleton width={"100%"} height={200} radius={"md"} />
                    </Box>
                    {
                      Array(2)
                        .fill(null)
                        .map((_, i) => (
                          <Box key={i} mb={0}>
                            <Skeleton height={100} width={"100%"} radius={"md"} />
                          </Box>
                        ))
                    }
                  </>
                  :
                  <>
                    <Box pt={10}>
                      <Box
                        bg={"white"}
                        style={{
                          border: `1px solid ${WARNA.borderBiruMuda}`,
                          borderRadius: 10,
                          padding: 10,
                        }}
                      >
                        <EchartPaiReport data={report.progress} />
                      </Box>
                    </Box>
                    <Box pt={10}>
                      <Box
                        bg={"white"}
                        style={{
                          border: `1px solid ${WARNA.borderBiruMuda}`,
                          borderRadius: 10,
                          padding: 10,
                        }}
                      >
                        <EchartBarReport data={report.dokumen} />
                      </Box>
                    </Box>
                    <Box pt={10}>
                      <Box
                        bg={"white"}
                        style={{
                          border: `1px solid ${WARNA.borderBiruMuda}`,
                          borderRadius: 10,
                          padding: 10,
                        }}
                      >
                        <EventReport data={report.event} tgl={moment(value).format("DD MMMM YYYY")} />
                      </Box>
                    </Box>

                  </>
              }
            </>
          }
        </Stack>
      </Box>
    </Box>
  );
}

