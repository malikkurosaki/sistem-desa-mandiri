import React, { useState } from 'react';
import { EChartsOption, color } from "echarts";
import EChartsReact from "echarts-for-react";
import { useShallowEffect } from '@mantine/hooks';
import * as echarts from 'echarts';
import { Box } from '@mantine/core';
import { WARNA } from '@/module/_global';

export default function EchartBarReport() {
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
          data: ['File', 'Dokumen'],
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
          name: 'Dokumen',
          type: 'bar',
          barWidth: '70%',
          data: [
            {
              value: 78,
              name: 'File',
              itemStyle: {
                color: "#F3C96B"
              }
            },
            {
              value: 58,
              name: 'Dokumen',
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
    <Box>
      <EChartsReact style={{ height: 400, width: "auto" }} option={options} />
    </Box>
  );
}
