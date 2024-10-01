"use client";
import { currentScroll, TEMA, WARNA } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import {
  ActionIcon,
  Box,
  Center,
  Flex,
  Grid,
  Group,
  Skeleton,
  Spoiler,
  Text,
} from "@mantine/core";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa6";
import { IListNotification } from "../lib/type_notification";
import {
  funGetAllNotification,
  funReadNotification,
} from "../lib/api_notification";
import toast from "react-hot-toast";

export default function ListNotification() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 369px)");
  const isMobile2 = useMediaQuery("(max-width: 575px)");
  const [isData, setData] = useState<IListNotification[]>([]);
  const tema = useHookstate(TEMA);
  const { value: containerRef } = useHookstate(currentScroll);
  const [isPage, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  async function fetchData(loading: boolean) {
    try {
      if (loading) setLoading(true);
      const res = await funGetAllNotification("?page=" + isPage);
      if (res.success) {
        if (isPage == 1) {
          setData(res.data);
        } else {
          setData([...isData, ...res.data]);
        }
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal memuat data, coba lagi nanti");
    } finally {
      setLoading(false);
    }
  }

  useShallowEffect(() => {
    fetchData(true);
  }, []);

  useShallowEffect(() => {
    fetchData(false);
  }, [isPage]);

  useEffect(() => {
    const handleScroll = async () => {
      if (containerRef && containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const containerHeight = containerRef.current.clientHeight;
        const scrollHeight = containerRef.current.scrollHeight;

        if (scrollTop + containerHeight >= scrollHeight) {
          setPage(isPage + 1);
        }
      }
    };

    const container = containerRef?.current;
    container?.addEventListener("scroll", handleScroll);
    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, isPage]);

  async function onReadNotif(
    category: string,
    idContent: string,
    idData: string
  ) {
    try {
      const response = await funReadNotification({ id: idData });
      if (response.success) {
        router.push(`/${category}/${idContent}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal memuat data, coba lagi nanti");
    }
  }

  return (
    <Box>
      {loading ? (
        Array(6)
          .fill(null)
          .map((_, i) => (
            <Box key={i} my={15}>
              <Skeleton height={110} radius={15} />
            </Box>
          ))
      ) : (
        <Box>
          {isData.length == 0 ? (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "60vh",
              }}
            >
              <Text c="dimmed" ta={"center"} fs={"italic"}>
                Tidak ada Notifikasi
              </Text>
            </Box>
          ) : (
            isData.map((v, i) => {
              return (
                <Box key={i} my={10}>
                  <Box
                    style={{
                      border: `1px solid ${v.isRead == false ? tema.get().utama : "gray"}`,
                      padding: 15,
                      borderRadius: 15,
                    }}
                  >
                    <Grid
                      align="center"
                      onClick={() => {
                        onReadNotif(v.category, v.idContent, v.id);
                      }}
                    >
                      <Grid.Col
                        span={{
                          base: 1,
                          xs: 1,
                          sm: 1,
                          md: 1,
                          lg: 1,
                          xl: 1,
                        }}
                      >
                        {/* <Center> */}
                        <ActionIcon
                          variant="light"
                          bg={v.isRead == false ? tema.get().utama : "gray"}
                          size={35}
                          radius={100}
                          aria-label="icon"
                        >
                          <FaBell
                            size={20}
                            color={v.isRead == false ? "white" : "white"}
                          />
                        </ActionIcon>
                        {/* </Center> */}
                      </Grid.Col>
                      <Grid.Col
                        span={{
                          base: 11,
                          xs: 11,
                          sm: 11,
                          md: 11,
                          lg: 11,
                          xl: 11,
                        }}
                      >
                        <Grid>
                          <Grid.Col
                            span={{
                              base: 7.5,
                              xl: 8,
                            }}
                          >
                            <Text
                              fw={"bold"}
                              c={v.isRead == false ? tema.get().utama : "gray"}
                              lineClamp={1}
                              pl={isMobile2 ? 20 : 10}
                            >
                              {v.title}
                            </Text>
                          </Grid.Col>
                          <Grid.Col
                            span={{
                              base: 4.5,
                              xl: 4,
                            }}
                          >
                            <Text
                              ta={"end"}
                              c={v.isRead == false ? tema.get().utama : "gray"}
                              fz={13}
                            >
                              {v.createdAt}
                            </Text>
                          </Grid.Col>
                        </Grid>
                      </Grid.Col>
                    </Grid>

                    <Spoiler
                      maxHeight={70}
                      showLabel="Lebih banyak"
                      hideLabel="Lebih sedikit"
                    >
                      <Text
                        mt={10}
                        fz={15}
                        c={v.isRead == false ? tema.get().utama : "gray"}
                        onClick={() => {
                          onReadNotif(v.category, v.idContent, v.id);
                        }}
                      >
                        {v.desc}
                      </Text>
                    </Spoiler>
                  </Box>
                </Box>
              );
            })
          )}
        </Box>
      )}

      {}
    </Box>
  );
}
