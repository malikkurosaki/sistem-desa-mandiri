'use client'
import { WARNA } from "@/module/_global";
import { Box } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import { useState } from "react";

export default function ChartDocumentHome() {
   const [options, setOptions] = useState<EChartsOption>({});

   useShallowEffect(() => {
      loadData()
   }, [])

   const loadData = () => {
      const option: EChartsOption = {
         title: {
            text: "DOKUMEN",
            top: '2%',
            left: 'center',
            textStyle: {
               color: WARNA.biruTua
            }
         },
         tooltip: {
            trigger: 'axis',
            axisPointer: {
               type: 'shadow'
            }
         },
         grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
         },
         xAxis: [
            {
               type: 'category',
               data: ['File', 'Folder', 'Documen'],
               axisLabel: {
                  fontSize: 14
               },
               axisTick: {
                  alignWithLabel: true
               },
               axisLine: {
                  show: true,
               },
            }
         ],
         yAxis: [
            {
               type: 'value',
               show: true,
               splitLine: {
                  lineStyle: {
                     color: "gray",
                     opacity: 0.1
                  }
               },
            }
         ],
         series: [
            {
               name: 'Direct',
               type: 'bar',
               barWidth: '70%',
               data: [
                  {
                     value: 78,
                     name: 'Confidence',
                     itemStyle: {
                        color: "#F3C96B"
                     }
                  },
                  {
                     value: 35,
                     name: 'Supportive',
                     itemStyle: {
                        color: "#9EC97F"
                     }
                  },
                  {
                     value: 58,
                     name: 'Positive',
                     itemStyle: {
                        color: "#5971C0"
                     }
                  },

               ],
            }
         ]
      };
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
   );
}