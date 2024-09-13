import React, { useState } from 'react';
import { EChartsOption, color } from "echarts";
import EChartsReact from "echarts-for-react";
import { useShallowEffect } from '@mantine/hooks';
import * as echarts from 'echarts';
import { Box } from '@mantine/core';
import { TEMA,  } from '@/module/_global';
import { useHookstate } from '@hookstate/core';

export default function EchartBarReport({ data }: { data: any }) {
  const [options, setOptions] = useState<EChartsOption>({});
  const color = ["#F3C96B", "#9EC97F", "#5971C0"]
  const tema = useHookstate(TEMA)

  useShallowEffect(() => {
    loadData(data)
  }, [data])

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
          name: 'Dokumen',
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
    <Box>
      <EChartsReact style={{ height: 400, width: "auto" }} option={options} />
    </Box>
  );
}
