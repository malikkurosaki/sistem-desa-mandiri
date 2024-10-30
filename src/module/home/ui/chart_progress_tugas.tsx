'use client'
import { TEMA } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import { Box } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { funGetHome } from "../lib/api_home";

export default function ChartProgressHome() {
   const [options, setOptions] = useState<EChartsOption>({});
   const [isData, setData] = useState<any[]>([])
   const [loading, setLoading] = useState(true);
   const tema = useHookstate(TEMA)
   useShallowEffect(() => {
      fetchData()
   }, [])



   const fetchData = async () => {
      try {
         setData([]);
         setLoading(true);
         const response = await funGetHome('?cat=progress')

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
            text: "PROGRES KEGIATAN",
            top: '2%',
            left: 'center',
            textStyle: {
               color: tema.get().utama
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
               data: value,
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