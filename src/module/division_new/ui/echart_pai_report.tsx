import React, { useState } from 'react';
import { EChartsOption, color } from "echarts";
import EChartsReact from "echarts-for-react";
import { useShallowEffect } from '@mantine/hooks';
import * as echarts from 'echarts';
import { Box } from '@mantine/core';
import { WARNA } from '@/module/_global';

export default function EchartPaiReport({ data }: { data: any }) {
  const [options, setOptions] = useState<EChartsOption>({});

  useShallowEffect(() => {
    loadData(data)
  }, [data])

  const loadData = (value: any) => {
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
    <Box>
      <EChartsReact style={{ height: 400, width: "auto" }} option={options} />
    </Box>
  );
}
