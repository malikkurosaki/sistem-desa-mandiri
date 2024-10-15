import { keyWibu, TEMA } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import { Box, Breadcrumbs, Button, Divider, Flex, Grid, Group, Modal, ScrollArea, Skeleton, Text, TextInput, } from "@mantine/core";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcFolder } from "react-icons/fc";
import { GoChevronRight } from "react-icons/go";
import { MdFolder } from "react-icons/md";
import { funCreateFolder, funGetAllDocument } from "../lib/api_document";
import { IDataDocument, IFormDetailMoreItem, IJalurItem, } from "../lib/type_document";
import { useWibuRealtime } from "wibu-realtime";

export default function DrawerCutDocuments({ category, onChoosePath, data, }: { category: string; data: IFormDetailMoreItem[]; onChoosePath: (val: string) => void; }) {
  const [opened, setOpened] = useState(false);
  const param = useParams<{ id: string }>();
  const [path, setPath] = useState("home");
  const [dataDocument, setDataDocument] = useState<IDataDocument[]>([]);
  const [dataJalur, setDataJalur] = useState<IJalurItem[]>([]);
  const [valName, setValName] = useState("");
  const tema = useHookstate(TEMA);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 369px)");
  const [dataRealTime, setDataRealtime] = useWibuRealtime({
    WIBU_REALTIME_TOKEN: keyWibu,
    project: "sdm"
  })

  async function onCreateFolder() {
    try {
      const res = await funCreateFolder({
        name: valName,
        path: path,
        idDivision: param.id,
      });
      if (res.success) {
        getOneData(false);
        setDataRealtime([{
          category: "division-document",
          id: path,
        }])
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal membuat folder baru, coba lagi nanti");
    }

    setOpened(false);
  }

  async function getOneData(loading: boolean) {
    try {
      setLoading(loading);
      const respon = await funGetAllDocument(
        "?division=" + param.id + "&path=" + path + "&category=folder"
      );
      if (respon.success) {
        setDataDocument(respon.data);
        setDataJalur(respon.jalur);
      } else {
        toast.error(respon.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan item, coba lagi nanti");
    } finally {
      setLoading(false);
    }
  }

  useShallowEffect(() => {
    getOneData(true);
  }, [param.id, path]);

  return (
    <Box>
      <Box
        h={60}
        pos={"fixed"}
        bottom={0}
        w={{ base: "92%", md: "94%" }}
        style={{
          zIndex: 999,
        }}
      >
        <Grid justify="center">
          <Grid.Col span={6}>
            <Button
              variant="subtle"
              fullWidth
              color={tema.get().utama}
              radius={"xl"}
              onClick={() => setOpened(true)}
            >
              BUAT FOLDER BARU
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button
              variant="filled"
              fullWidth
              color={tema.get().utama}
              radius={"xl"}
              onClick={() => onChoosePath(path)}
            >
              {category == "move" ? "PINDAH" : "SALIN"}
            </Button>
          </Grid.Col>
        </Grid>
      </Box>
      <Box pb={60}>
        <Box>
          <Breadcrumbs
            separator={<GoChevronRight />}
            separatorMargin="md"
            mb={10}
          >
            {dataJalur.map((v, i) => {
              return (
                <Text
                  onClick={() => setPath(v.id)}
                  key={i}
                  style={{ cursor: "pointer" }}
                >
                  {v.name}
                </Text>
              );
            })}
          </Breadcrumbs>
        </Box>
        <ScrollArea
          h={{
            base: "55vh",
            xl: "56vh",
            md: "56vh",
            sm: "56vh",
          }}
          type="scroll"
          scrollbarSize={2}
          scrollHideDelay={0}
          scrollbars="y"
        >
          {loading ? (
            <Group align="center">
              <Skeleton height={15} width={100} />
              <Skeleton height={15} width={100} />
            </Group>
          ) : null}
          {loading ? (
            Array(6)
              .fill(null)
              .map((_, i) => (
                <Box key={i}>
                  <Box mt={20} mb={20}>
                    <Grid align="center">
                      <Grid.Col span={2}>
                        <Skeleton
                          height={isMobile ? 40 : 50}
                          width={isMobile ? 40 : 50}
                        />
                      </Grid.Col>
                      <Grid.Col span={10}>
                        <Group justify="space-between" align="center">
                          <Flex direction={"column"}>
                            <Skeleton height={15} width={200} />
                            <Skeleton mt={5} height={10} width={200} />
                          </Flex>
                        </Group>
                      </Grid.Col>
                    </Grid>
                  </Box>
                  <Divider size="xs" />
                </Box>
              ))
          ) : (
            <Box>
              {dataDocument.length == 0 ? (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                  }}
                >
                  <Text c="dimmed" ta={"center"} fs={"italic"}>
                    Tidak ada Dokumen
                  </Text>
                </Box>
              ) : (
                <Box>
                  {dataDocument.map((v, i) => {
                    const found = data.some((i: any) => i.id == v.id);
                    return (
                      <Box key={i}>
                        <Box
                          mt={10}
                          mb={10}
                          onClick={() => {
                            if (!found) {
                              setPath(v.id);
                            }
                          }}
                        >
                          <Grid align="center">
                            <Grid.Col span={12}>
                              <Group gap={20}>
                                <Box>
                                  {found ? (
                                    <MdFolder size={60} color="grey" />
                                  ) : (
                                    <FcFolder size={60} />
                                  )}
                                </Box>
                                <Flex direction={"column"}>
                                  <Text>
                                    {v.category == "FOLDER"
                                      ? v.name
                                      : v.name + "." + v.extension}
                                  </Text>
                                  {found && (
                                    <Text c={"dimmed"} fz={13} fs={"italic"}>
                                      Tidak bisa memilih folder ini
                                    </Text>
                                  )}
                                </Flex>
                              </Group>
                            </Grid.Col>
                          </Grid>
                        </Box>
                        <Divider size="xs" />
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          )}
        </ScrollArea>
      </Box>

      <Modal
        styles={{
          body: {
            borderRadius: 20,
          },
          content: {
            borderRadius: 20,
            border: `2px solid ${"#828AFC"}`,
          },
        }}
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        withCloseButton={false}
      >
        <Box p={20}>
          <Text ta={"center"} fw={"bold"}>
            Buat Folder
          </Text>
          <Box mt={20} mb={20}>
            <TextInput
              styles={{
                input: {
                  color: tema.get().utama,
                  borderRadius: "#828AFC",
                  borderColor: "#828AFC",
                },
              }}
              size="md"
              radius={10}
              placeholder="Nama folder"
              value={valName}
              onChange={(e) => setValName(e.target.value)}
            />
          </Box>
          <Grid mt={40}>
            <Grid.Col span={6}>
              <Button
                variant="subtle"
                fullWidth
                color="#969494"
                onClick={() => setOpened(false)}
              >
                Batalkan
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                variant="subtle"
                fullWidth
                color={tema.get().utama}
                onClick={() => onCreateFolder()}
              >
                Membuat
              </Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
