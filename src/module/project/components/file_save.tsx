'use client'
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import { Box, Button, Center, SimpleGrid, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsFiletypeCsv } from "react-icons/bs";

const dataFile = [
  {
    id: 1,
    name: "Semua_Proyek.csv",
  },
  {
    id: 2,
    name: "Proyek_Dinas.csv",
  },
  {
    id: 3,
    name: "Proyek_Lpd.csv",
  },
  {
    id: 4,
    name: "Proyek_Lembaga1.csv",
  },
  {
    id: 5,
    name: "Proyek_Lembaga2.csv",
  },
  {
    id: 6,
    name: "Proyek_Lembaga3.csv",
  },
];


export default function FileSave() {
  const router = useRouter()
  const [selectedFiles, setSelectedFiles] = useState<Record<number, boolean>>({});

  const handleFileClick = (index: number) => {
    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [index]: !prevSelectedFiles[index],
    }));
  };

  return (
    <Box>
      <LayoutNavbarNew back="/project/create" title="File Tersimpan" menu />
      <Box p={20}>
        <SimpleGrid
          cols={{ base: 2, sm: 2, lg: 2 }}
          spacing={{ base: 20, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          {dataFile.map((file, index) => {
            const isSelected = selectedFiles[index];
            return (
              <Box key={index} mb={20}>
                <Box
                  bg={"#DCEED8"}
                  style={{
                    border: `${isSelected ? "2px solid #FFC107" : "1px solid #D6D8F6"}`,
                    borderRadius: 10,
                  }}
                  py={30}
                  onClick={() => handleFileClick(index)}
                >
                  <Center>
                    <BsFiletypeCsv size={80} />
                  </Center>
                </Box>
                <Text mt={10} ta="center">
                  {file.name}
                </Text>
              </Box>
            );
          })}
        </SimpleGrid>
        <Box mt="xl">
          <Button color="white" bg={WARNA.biruTua} size="lg" radius={30} fullWidth onClick={() => router.push('/project/create?anggota=yes&files=yes&button=yes')}>
            Simpan
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
