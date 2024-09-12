'use client'
import { TEMA, WARNA } from "@/module/_global";
import { Box } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { funGetHome } from "../lib/api_home";
import { useHookstate } from "@hookstate/core";

export default function ChartDocumentHome() {
   const [options, setOptions] = useState<EChartsOption>({})
   const [isData, setData] = useState<any[]>([])
   const [loading, setLoading] = useState(true)
   const color = ["#F3C96B", "#9EC97F", "#5971C0"]
   const tema = useHookstate(TEMA)

   useShallowEffect(() => {
      fetchData()
   }, [])



   const fetchData = async () => {
      try {
         setData([]);
         setLoading(true);
         const response = await funGetHome('?cat=dokumen')

         if (response.success) {
            setData(response.data)
            loadData(response.data)
         } else {
            toast.error(response.message);
         }
         setLoading(false);
      } catch (error) {
         toast.error("Gagal mendapatkan data, coba lagi nanti");
         console.error(error);
      } finally {
         setLoading(false);
      }
   };

   const loadData = (value: any) => {
      const option: EChartsOption = {
         title: {
            text: "DOKUMEN",
            top: '2%',
            left: 'center',
            textStyle: {
               color: tema.get().utama
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
               data: value.map(({ name }: any) => name),
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
               data: value.map(
                  (v: any, i: any) =>
                  ({
                     name: v.name,
                     value: v.value,
                     itemStyle: {
                        color: color[i]
                     },
                  })
               ),
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