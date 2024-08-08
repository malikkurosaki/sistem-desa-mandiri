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
import EditDrawerGroup from "./edit_drawer_group";
import toast from "react-hot-toast";
import { useShallowEffect } from "@mantine/hooks";
import { funGetAllGroup } from "../lib/api_group";
import { IDataGroup } from "../lib/type_group";
import { useSearchParams } from "next/navigation";


export default function ListGroupActive() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [valChoose, setValChoose] = useState("");
  const [isData, setData] = useState<IDataGroup[]>([]);
  const [selectId, setSelectId] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams()
  const status = searchParams.get('active')
  

  const fetchData = async () => {
    try {
      setData([]);
      setLoading(true);

      const response = await funGetAllGroup('?active=' + status + '&search=' + searchQuery)

      if (response.success) {
        setData(response?.data)
      } else {
        toast.error(response.message);
      }

      setLoading(false);
    } catch (error) {
      toast.error("Gagal mendapatkan grup, coba lagi nanti");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useShallowEffect(() => {
    fetchData();
  }, [status, searchQuery]);

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
        onChange={(e) => setSearchQuery(e.target.value)}
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
              fetchData();
            }
            setOpenDrawer(false);
          }}
        />
      </LayoutDrawer>
    </Box>
  );
}
