import { API_ADDRESS, LayoutDrawer, SkeletonSingle, WARNA } from "@/module/_global";
import {
  ActionIcon,
  Box,
  Group,
  Skeleton,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import EditDrawerGroup from "./ui/edit_drawer_group";
import toast from "react-hot-toast";
import { useShallowEffect } from "@mantine/hooks";

type dataGroup = {
  id: string;
  name: string;
  isActive: boolean;
};

export default function ListGroupActive({ status }: { status: boolean }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [valChoose, setValChoose] = useState("");
  const [isData, setData] = useState<dataGroup[]>([]);
  const [selectId, setSelectId] = useState<string | null>(null);
  const [active, setActive] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setData([]);
      setLoading(true);
      const res = await fetch(
        `${API_ADDRESS.apiGetAllGroup}&villageId=121212&active=` + status
      );
      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error("Terjadi kesalahan");
      } else {
        console.error("Error tidak diketahui");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [status]);

  return (
    <Box pt={20}>
      <TextInput
        styles={{
          input: {
            color: WARNA.biruTua,
            borderRadius: WARNA.biruTua,
            borderColor: WARNA.biruTua,
          },
        }}
        size="md"
        radius={30}
        leftSection={<HiMagnifyingGlass size={20} />}
        placeholder="Pencarian"
      />
      {loading
        ? Array(6)
            .fill(null)
            .map((_, i) => (
              <Box key={i}>
              <SkeletonSingle />
            </Box>
            ))
        : isData.map((v, i) => {
            return (
              <Box pt={20} key={i}>
                <Group
                  align="center"
                  style={{
                    border: `1px solid ${"#DCEED8"}`,
                    padding: 10,
                    borderRadius: 10,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setValChoose(v.name);
                    setOpenDrawer(true);
                    setSelectId(v.id);
                    setActive(v.isActive);
                  }}
                >
                  <Box>
                    <ActionIcon
                      variant="light"
                      bg={"#DCEED8"}
                      size={50}
                      radius={100}
                      aria-label="icon"
                    >
                      <HiOutlineOfficeBuilding
                        color={WARNA.biruTua}
                        size={25}
                      />
                    </ActionIcon>
                  </Box>
                  <Box>
                    <Text fw={"bold"} c={WARNA.biruTua}>
                      {v.name}
                    </Text>
                  </Box>
                </Group>
              </Box>
            );
          })}
      <LayoutDrawer
        opened={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title={valChoose}
      >
        <EditDrawerGroup
          id={selectId}
          isActive={active}
          onUpdated={(val) => {
            if (val) {
              toast.success("Sukses! data tersimpan");
              getData();
            }
            setOpenDrawer(false);
          }}
        />
      </LayoutDrawer>
    </Box>
  );
}
