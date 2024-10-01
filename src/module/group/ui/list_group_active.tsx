import { LayoutDrawer, SkeletonSingle, TEMA, WARNA } from "@/module/_global";
import {
  ActionIcon,
  Box,
  Flex,
  Grid,
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
import _ from "lodash";
import { useHookstate } from "@hookstate/core";
import { globalRefreshGroup } from "../lib/val_group";


export default function ListGroupActive() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [valChoose, setValChoose] = useState("");
  const [isData, setData] = useState<IDataGroup[]>([]);
  const [selectId, setSelectId] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams()
  const refresh = useHookstate(globalRefreshGroup)
  const status = searchParams.get('active')
  const tema = useHookstate(TEMA)


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
  }, [status, searchQuery, refresh.get()]);

  return (
    <Box pt={20}>
      <TextInput
        styles={{
          input: {
            color: tema.get().utama,
            borderRadius: tema.get().utama,
            borderColor: tema.get().utama,
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
        :
        _.isEmpty(isData)
          ?
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada grup</Text>
          </Box>
          :
          isData.map((v, i) => {
            return (
              <Box pt={20} key={i}>
                <Group
                  align="center"
                  style={{
                    border: `1px solid ${tema.get().bgTotalKegiatan}`,
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
                  <Grid justify='center' align='center' >
                    <Grid.Col span={{
                      base: 3,
                      xl: 2
                    }}>
                      <Flex justify={{base: "center", xl: "flex-start"}}>
                        <ActionIcon
                          variant="light"
                          bg={tema.get().bgTotalKegiatan}
                          size={50}
                          radius={100}
                          aria-label="icon"
                        >
                          <HiOutlineOfficeBuilding
                            color={tema.get().utama}
                            size={25}
                          />
                        </ActionIcon>
                      </Flex>
                    </Grid.Col>
                    <Grid.Col span={{
                      base: 9,
                      xl: 10
                    }}>
                      <Box
                        w={{
                          base: 220,
                          xl: 400
                        }}
                      >
                        <Text fw={"bold"} c={tema.get().utama} lineClamp={1}>
                      {v.name}
                    </Text>
                      </Box>
                    </Grid.Col>
                  </Grid>
                </Group>
              </Box>
            );
          })}

      <LayoutDrawer
        opened={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title={<Text lineClamp={1}>{valChoose}</Text>}
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
