"use client";
import { LayoutNavbarNew, SkeletonList, TEMA, WARNA } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import { ActionIcon, Avatar, Box, Divider, Grid, Text, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiMagnifyingGlass, HiMiniPresentationChartBar, HiMiniUserGroup, } from "react-icons/hi2";
import { funGetSearchAll } from "../lib/api_search";
import { IDataDivisionSearch, IDataProjectSearch, IDataUserSearch, } from "../lib/type_search";

export default function ViewSearch() {
  const [search, setSearch] = useState("")
  const [dataUser, setDataUser] = useState<IDataUserSearch[]>([])
  const [dataProject, setDataProject] = useState<IDataProjectSearch[]>([])
  const [dataDivision, setDataDivision] = useState<IDataDivisionSearch[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const tema = useHookstate(TEMA)
  const isMobile2 = useMediaQuery("(max-width: 460px)");

  async function featchSearch(cari: string) {
    try {
      setLoading(true)
      setSearch(cari)
      if (cari != "") {
        const res = await funGetSearchAll("?search=" + cari);
        setDataUser(res.data.user);
        setDataProject(res.data.project);
        setDataDivision(res.data.division);
      } else {
        setDataUser([]);
        setDataProject([]);
        setDataDivision([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan data, coba lagi nanti");
    } finally {
      setLoading(false)
    }
  }



  return (
    <>
      <LayoutNavbarNew back="/home" title="Pencarian" menu={<></>} />
      <Box p={20}>
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
          onChange={(e) => featchSearch(e.target.value)}
        />
        {
          loading ?
            Array(5)
              .fill(null)
              .map((_, i) => (
                <Box key={i}>
                  <SkeletonList />
                </Box>
              ))
            :
            dataUser.length || dataProject.length || dataDivision.length > 0 ?
              (
                <Box pt={20}>
                  <Box
                    style={{
                      border: `1px solid ${WARNA.borderBiruMuda}`,
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    {dataUser.length > 0 ? (
                      <Box>
                        <Text>ANGGOTA</Text>
                        <Box
                          style={{
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                            backgroundColor: `#E7EBF1`,
                            borderRadius: 5,
                          }}
                        >
                          {dataUser.length > 0 ? (
                            <Box mt={5}>
                              {dataUser.map((v, i) => {
                                return (
                                  <Box key={i}>
                                    <Box
                                      onClick={() => {
                                        router.push(`/member/${v.id}`);
                                      }}
                                    >
                                      <Grid align="center">
                                        <Grid.Col
                                          span={{
                                            base: 1.5,
                                            xs: 1.5,
                                            sm: 1.5,
                                            md: 1.5,
                                            lg: 1.5,
                                            xl: 1.5,
                                          }}
                                        >
                                          <Avatar
                                            src={`https://wibu-storage.wibudev.com/api/files/${v.img}`}
                                            size={50}
                                            alt="image"
                                          />
                                        </Grid.Col>
                                        <Grid.Col
                                          span={{
                                            base: 10,
                                            xs: 10.5,
                                            sm: 10.5,
                                            md: 10.5,
                                            lg: 10.5,
                                            xl: 10.5,
                                          }}
                                          pl={isMobile2 ? 30 : 20}
                                        >
                                          <Text
                                            fw={"bold"}
                                            c={tema.get().utama}
                                            truncate="end"
                                          >
                                            {_.startCase(v.name)}
                                          </Text>
                                          <Text fw={"lighter"} fz={12} truncate="end">
                                            {v.group + " - " + v.position}
                                          </Text>
                                        </Grid.Col>
                                      </Grid>
                                    </Box>
                                    <Divider my={10} />
                                  </Box>
                                );
                              })}
                            </Box>
                          ) : null}
                        </Box>
                      </Box>
                    ) : null}

                    {dataDivision.length > 0 ? (
                      <Box mt={10}>
                        <Text>DIVISI</Text>
                        <Box
                          style={{
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                            backgroundColor: `#E7EBF1`,
                            borderRadius: 5,
                          }}
                        >
                          {dataDivision.length > 0 ? (
                            <Box>
                              {dataDivision.map((v, i) => {
                                return (
                                  <Box
                                    key={i}
                                    onClick={() => router.push(`/division/${v.id}`)}
                                  >
                                    <Grid align="center" mt={15}>
                                      <Grid.Col
                                        span={{
                                          base: 1.5,
                                          xs: 1.5,
                                          sm: 1.5,
                                          md: 1.5,
                                          lg: 1.5,
                                          xl: 1.5,
                                        }}
                                      >
                                        <ActionIcon
                                          variant="light"
                                          bg={tema.get().utama}
                                          size={50}
                                          radius={100}
                                          aria-label="icon"
                                        >
                                          <HiMiniUserGroup
                                            color={"white"}
                                            size={25}
                                          />
                                        </ActionIcon>
                                      </Grid.Col>
                                      <Grid.Col
                                        span={{
                                          base: 10,
                                          xs: 10.5,
                                          sm: 10.5,
                                          md: 10.5,
                                          lg: 10.5,
                                          xl: 10.5,
                                        }}
                                        pl={isMobile2 ? 30 : 20}
                                      >
                                        <Box
                                        >
                                          <Text
                                            fw={"bold"}
                                            c={tema.get().utama}
                                            truncate="end"
                                          >
                                            {v.name.toUpperCase()}
                                          </Text>
                                        </Box>
                                        <Text fw={"lighter"} fz={12} truncate="end">
                                          {v.group}
                                        </Text>
                                      </Grid.Col>
                                    </Grid>
                                    <Text
                                      fw={"lighter"}
                                      mt={10}
                                      mb={10}
                                      lineClamp={2}
                                    >
                                      {v.desc}
                                    </Text>
                                    <Divider my={5} />
                                  </Box>
                                );
                              })}
                            </Box>
                          ) : null}
                        </Box>
                      </Box>
                    ) : null}

                    {dataProject.length > 0 ? (
                      <Box mt={10}>
                        <Text>KEGIATAN</Text>
                        <Box
                          style={{
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                            backgroundColor: `#E7EBF1`,
                            borderRadius: 5,
                          }}
                        >
                          {dataProject.length > 0 ? (
                            <Box>
                              {dataProject.map((v, i) => {
                                return (
                                  <Box
                                    key={i}
                                    onClick={() => router.push(`/project/${v.id}`)}
                                  >
                                    <Grid justify="center" align="center" mt={10}>
                                      <Grid.Col
                                        span={{
                                          base: 1.5,
                                          xs: 1.5,
                                          sm: 1.5,
                                          md: 1.5,
                                          lg: 1.5,
                                          xl: 1.5,
                                        }}
                                      >
                                        <ActionIcon
                                          variant="light"
                                          bg={tema.get().utama}
                                          size={50}
                                          radius={100}
                                          aria-label="icon"
                                        >
                                          <HiMiniPresentationChartBar
                                            color={"white"}
                                            size={25}
                                          />
                                        </ActionIcon>
                                      </Grid.Col>
                                      <Grid.Col
                                        span={{
                                          base: 10,
                                          xs: 10.5,
                                          sm: 10.5,
                                          md: 10.5,
                                          lg: 10.5,
                                          xl: 10.5,
                                        }}
                                        pl={isMobile2 ? 30 : 20}
                                      >
                                        <Box
                                        >
                                          <Text
                                            fw={"bold"}
                                            c={tema.get().utama}
                                            truncate="end"
                                          >
                                            {v.title.toUpperCase()}
                                          </Text>
                                        </Box>
                                        <Text fw={"lighter"} fz={12} truncate="end">
                                          {v.group}
                                        </Text>
                                      </Grid.Col>
                                    </Grid>
                                    <Divider mt={10} />
                                  </Box>
                                );
                              })}
                            </Box>
                          ) : null}
                        </Box>
                      </Box>
                    ) : null}
                  </Box>
                </Box>
              ) :
              search != '' ?
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                  <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada data</Text>
                </Box>
                : null
        }
      </Box>
    </>
  );
}
