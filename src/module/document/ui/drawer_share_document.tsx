import { TEMA } from "@/module/_global";
import {
  funGetListDivisionByIdDivision,
  IDataDivison,
} from "@/module/division_new";
import { IDataMemberTaskDivision } from "@/module/task/lib/type_task";
import {
  Box,
  Select,
  Button,
  Avatar,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  ActionIcon,
  ScrollArea,
  Skeleton,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaUsers } from "react-icons/fa6";
import { IShareDivision } from "../lib/type_document";
import { funShareDocument } from "../lib/api_document";
import { useHookstate } from "@hookstate/core";
import { globalRefreshDocument } from "../lib/val_document";

export default function DrawerShareDocument({
  data,
}: {
  data: IShareDivision[];
}) {
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [isData, setData] = useState<IDataDivison[]>([]);
  const param = useParams<{ id: string }>();
  const refresh = useHookstate(globalRefreshDocument);
  const tema = useHookstate(TEMA);
  const [loading, setLoading] = useState(true);

  async function onShare() {
    try {
      if (selectedFiles.length == 0) {
        return toast.error("Pilih divisi terlebih dahulu");
      }

      const respon = await funShareDocument({
        dataDivision: selectedFiles,
        dataItem: data,
      });
      if (respon.success) {
        toast.success(respon.message);
        refresh.set(true);
      } else {
        toast.error(respon.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal membagikan item, coba lagi nanti");
    }
  }

  async function getData() {
    try {
      setLoading(true);
      const response = await funGetListDivisionByIdDivision(
        "?division=" + param.id
      );
      if (response.success) {
        setData(response.data.filter((i: any) => i.id != param.id));
      } else {
        toast.error(response.message);
      }
      setLoading(false);
    } catch (error) {
      toast.error("Gagal mendapatkan divisi, coba lagi nanti");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useShallowEffect(() => {
    getData();
  }, []);

  const handleFileClick = (index: number) => {
    if (selectedFiles.some((i: any) => i.id == isData[index].id)) {
      setSelectedFiles(
        selectedFiles.filter((i: any) => i.id != isData[index].id)
      );
    } else {
      setSelectedFiles([
        ...selectedFiles,
        { id: isData[index].id, name: isData[index].name },
      ]);
    }
  };

  return (
    <Box pt={10}>
      <Box mt={10}>
        <ScrollArea
          h={{
            base: "58vh",
            xl: "58vh",
            md: "57vh",
            sm: "58vh",
          }}
          type="scroll"
          scrollbarSize={2}
          scrollHideDelay={0}
          scrollbars="y"
        >
          {loading ? (
            Array(6)
              .fill(null)
              .map((_, i) => (
                <Box mb={15} key={i}>
                  <Flex justify={"space-between"} align={"center"}>
                    <Group>
                      <Skeleton circle height={42} width={42} />
                      <Stack align="flex-start" justify="flex-start">
                        <Skeleton height={20} width={150} />
                      </Stack>
                    </Group>
                    <Skeleton height={20} width={20} />
                  </Flex>
                  <Divider my={"md"} />
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
                    height: "30vh",
                  }}
                >
                  <Text c="dimmed" ta={"center"} fs={"italic"}>
                    Tidak ada Divisi
                  </Text>
                </Box>
              ) : (
                <Box>
                  {isData.map((v, i) => {
                    const isSelected = selectedFiles.some(
                      (i: any) => i?.id == v.id
                    );
                    return (
                      <Box mb={15} key={i} onClick={() => handleFileClick(i)}>
                        <Flex justify={"space-between"} align={"center"}>
                          <Group>
                            <ActionIcon
                              variant="light"
                              color="gray"
                              radius="xl"
                              size={42}
                              p={10}
                            >
                              <FaUsers fontSize={40} />
                            </ActionIcon>
                            <Stack align="flex-start" justify="flex-start">
                              <Text
                                style={{
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {v.name}
                              </Text>
                            </Stack>
                          </Group>
                          <Text
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              paddingLeft: 20,
                            }}
                          >
                            {isSelected ? (
                              <FaCheck style={{ marginRight: 10 }} />
                            ) : (
                              ""
                            )}
                          </Text>
                        </Flex>
                        <Divider my={"md"} />
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          )}
        </ScrollArea>
      </Box>
      <Box
        h={60}
        pos={"fixed"}
        bottom={0}
        w={{ base: "92%", md: "94%" }}
        style={{
          zIndex: 999,
        }}
      >
        <Box>
          <Button
            c={"white"}
            bg={tema.get().utama}
            size="lg"
            radius={30}
            fullWidth
            onClick={() => onShare()}
          >
            Simpan
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
