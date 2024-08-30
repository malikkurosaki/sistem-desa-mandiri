import React, { useState } from 'react';
import { EChartsOption, color } from "echarts";
import EChartsReact from "echarts-for-react";
import { useShallowEffect } from '@mantine/hooks';
import * as echarts from 'echarts';
import { Box } from '@mantine/core';
import { WARNA } from '@/module/_global';

export default function EventReport() {
  const [options, setOptions] = useState<EChartsOption>({});

  useShallowEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const option: EChartsOption = {
      title: {
        text: "EVENT",
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
          data: ['Belum Dilaksanakan', 'Sudah Dilaksanakan'],
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
          name: 'Event',
          type: 'bar',
          barWidth: '70%',
          data: [
            {
              value: 78,
              name: 'Belum dilaksanakan',
              itemStyle: {
                color: "#BA3E3E"
              }
            },
            {
              value: 58,
              name: 'Sudah dilaksanakan',
              itemStyle: {
                color: "#29A253"
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
