"use client";
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import { Box, Select, Stack, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React, { useState } from "react";
import EchartPaiReport from "./echart_pai_report";
import EchartBarReport from "./echart_bar_report";
import EventReport from "./event_report";
import DiscussionReport from "./discussion_report";

export default function CreateReport() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Box>
      <LayoutNavbarNew back="/division" title="Report Divisi" menu />
      <Box p={20}>
        <Stack>
          <Select
            placeholder="Grup"
            label="Grup"
            size="md"
            required
            radius={10}
          />
          <DateInput
            value={value}
            onChange={setValue}
            radius={10}
            size="md"
            required
            label="Date input"
            placeholder="Date input"
          />
          <Box pt={10}>
            <Box
              bg={"white"}
              style={{
                border: `1px solid ${WARNA.borderBiruMuda}`,
                borderRadius: 10,
                padding: 10,
              }}
            >
              <EchartPaiReport />
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
              <EchartBarReport />
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
              <EventReport />
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
              <DiscussionReport />
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
