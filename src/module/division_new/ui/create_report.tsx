"use client";
import { LayoutNavbarNew, TEMA } from "@/module/_global";
import { Box, Select, Skeleton, Stack, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React, { useState } from "react";
import EchartPaiReport from "./echart_pai_report";
import EchartBarReport from "./echart_bar_report";
import EventReport from "./event_report";
import DiscussionReport from "./discussion_report";
import { funGetAllGroup, IDataGroup } from "@/module/group";
import toast from "react-hot-toast";
import { useShallowEffect } from "@mantine/hooks";
import { funGetReportDivision } from "../lib/api_division";
import { useParams } from "next/navigation";
import moment from "moment";
import { useHookstate } from "@hookstate/core";

export default function CreateReport() {
  const [value, setValue] = useState<Date | null>(null);
  const [dataGroup, setDataGroup] = useState<IDataGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [tampil, setTampil] = useState(false);
  const [isGroup, setIsGroup] = useState("");
  const param = useParams<{ id: string }>()
  const tema = useHookstate(TEMA)
  const [report, setReport] = useState({
    progress: [],
    dokumen: [],
    event: [],
  })

  async function loadData() {
    const loadGroup = await funGetAllGroup('?active=true')
    if (loadGroup.success) {
      setDataGroup(loadGroup.data);
    } else {
      toast.error(loadGroup.message);
    }
  }

  async function onReport(group: string, date: any) {
    try {
      setReport({
        progress: [],
        dokumen: [],
        event: [],
      })
      setTampil(true)
      setLoading(true)
      const res = await funGetReportDivision(`?group=${group}&division=${param.id}&date=${moment(date).format("YYYY-MM-DD")}`)
      if (res.success) {
        setReport(res.data)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal mendapatkan data, coba lagi nanti");
    } finally {
      setLoading(false)
    }
  }

  function onChooseGroup(val: any) {
    if (val != null && val != "" && value != null && value != undefined) {
      onReport(val, value)
    }

    if (val == null || val == "") {
      setTampil(false)
      toast.error("Error! harus memilih grup")
    }
    setIsGroup(String(val))
  }

  function onChangeDate(val: any) {
    if (val != null && val != "" && isGroup != "" && isGroup != "null") {
      onReport(isGroup, val)
    }

    if (isGroup == null || isGroup == "") {
      setTampil(false)
      toast.error("Error! harus memilih grup")
    }

    setValue(val)
  }

  useShallowEffect(() => {
    loadData();
  }, []);

  return (
    <Box>
      <LayoutNavbarNew back="/division" title="Laporan Divisi" menu />
      <Box p={20}>
        <Stack>
          <Select
            placeholder="Grup"
            label="Grup"
            size="md"
            required
            radius={10}
            data={dataGroup?.map((pro: any) => ({
              value: String(pro.id),
              label: pro.name
            }))}
            onChange={(val) => { onChooseGroup(val) }}
          />
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
                          border: `1px solid ${tema.get().bgTotalKegiatan}`,
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
                          border: `1px solid ${tema.get().bgTotalKegiatan}`,
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
                          border: `1px solid ${tema.get().bgTotalKegiatan}`,
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
