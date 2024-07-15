'use client'
import { WARNA } from "@/module/_global";
import { Box, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import { useState } from "react";

export default function ChartProgressHome() {
   const [options, setOptions] = useState<EChartsOption>({});

   useShallowEffect(() => {
      loadData()
   }, [])

   const loadData = () => {
      const option: EChartsOption = {
         title: {
            text: "PROGRES TUGAS",
            top: '2%',
            left: 'center',
            textStyle: {
               color: WARNA.biruTua
            }
         },
         legend: {
            top: 'bottom',
         },
         series: [
            {
               name: 'Progres Tugas',
               type: 'pie',
               radius: '70%',
               avoidLabelOverlap: false,
               itemStyle: {
                  borderRadius: 2,
                  borderWidth: 2
               },
               label: {
                  position: "inner",
                  formatter: (a) => {
                     return `${a.value + "%"}`;
                  },
               },
               data: [
                  { value: 25, name: 'Dikerjakan' },
                  { value: 35, name: 'Selesai dikerjakan' },
                  { value: 10, name: 'Segera dikerjakan' },
                  { value: 30, name: 'Batal dikerjakan' },
               ],
               emphasis: {
                  itemStyle: {
                     shadowBlur: 10,
                     shadowOffsetX: 0,
                     shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
               }
            }
         ]
      }
      setOptions(option);
   }

   return (
      <Box pt={10}>
         <Box bg={"white"} style={{
            borderRadius: 10,
            border: `1px solid ${"#D6D8F6"}`,
            padding: 20
         }}>
            <Box>
               <EChartsReact style={{ height: 400, width: "auto" }} option={options} />
            </Box>
         </Box>
      </Box>
   )
}