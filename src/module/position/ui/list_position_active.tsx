import { globalRole, LayoutDrawer, SkeletonSingle, WARNA } from "@/module/_global";
import { ActionIcon, Box, Group, Text, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { FaUserTie } from "react-icons/fa6";
import { HiMagnifyingGlass } from "react-icons/hi2";
import DrawerDetailPosition from "./drawer_detail_position";
import toast from "react-hot-toast";
import _ from "lodash";
import { useShallowEffect } from "@mantine/hooks";
import { useSearchParams } from "next/navigation";
import { funGetAllPosition } from "../lib/api_position";
import { IDataPosition } from "../lib/type_position";
import { useHookstate } from "@hookstate/core";
import { globalRefreshPosition } from "../lib/val_posisition";


export default function ListPositionActive() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isData, setData] = useState("");
  const [isDataPosition, setDataPosition] = useState<IDataPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectId, setSelectId] = useState<string>('');
  const [active, setActive] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchParams = useSearchParams()
  const group = searchParams.get('group')
  const status = searchParams.get('active')
  const refresh = useHookstate(globalRefreshPosition)
  const roleLogin = useHookstate(globalRole)
  const [nameGroup, setNameGroup] = useState('')

  async function getAllPosition() {
    try {
      setLoading(true)
      const res = await funGetAllPosition('?active=' + status + '&group=' + group + '&search=' + searchQuery)
      setDataPosition(res.data);
      setNameGroup(res.filter.name)
      setLoading(false)
    } catch (error) {
      toast.error("Gagal mendapatkan position, coba lagi nanti");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useShallowEffect(() => {
    getAllPosition();
  }, [status, group, searchQuery, refresh.get()])


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
      {loading ? Array(6).fill(null).map((_, i) => (
        <Box key={i}>
          <SkeletonSingle />
        </Box>
      )) :
        <Box pt={20}>
          {roleLogin.get() == 'supadmin' && <Text>Filter by: {nameGroup}</Text>}
          {isDataPosition.length == 0 ?
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
              <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada jabatan</Text>
            </Box>
            :
            <Box >
              {isDataPosition.map((v, i) => {
                return (
                  <Box pb={20} key={i}>
                    <Group
                      align="center"
                      style={{
                        border: `1px solid ${"#DCEED8"}`,
                        padding: 10,
                        borderRadius: 10,
                      }}
                      onClick={() => {
                        if (roleLogin.get() != 'user') {
                          setData(v.name);
                          setOpenDrawer(true);
                          setSelectId(v.id);
                          setActive(v.isActive);
                        }
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
                          <FaUserTie color={WARNA.biruTua} size={25} />
                        </ActionIcon>
                      </Box>
                      <Box>
                        <Text fw={"bold"} c={WARNA.biruTua}>
                          {v.name}
                        </Text>
                        <Text fw={"lighter"} fz={12}>
                          {v.group}
                        </Text>
                      </Box>
                    </Group>
                  </Box>
                );
              })}
            </Box>}
        </Box>
      }
      <LayoutDrawer
        opened={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title={isData}
      >
        <DrawerDetailPosition
          id={selectId}
          isActive={active}
          onUpdated={() => {
            setOpenDrawer(false);
          }}
        />
      </LayoutDrawer>
    </Box>
  );
}
