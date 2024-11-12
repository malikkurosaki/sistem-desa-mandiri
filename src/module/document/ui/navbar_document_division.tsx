"use client";
import { keyWibu, LayoutDrawer, LayoutModalViewFile, LayoutNavbarNew, TEMA, } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { funGetDivisionById } from "@/module/division_new";
import { useHookstate } from "@hookstate/core";
import { ActionIcon, Box, Breadcrumbs, Button, Checkbox, Divider, Flex, Grid, Group, Indicator, Menu, Modal, rem, SimpleGrid, Skeleton, Text, TextInput } from "@mantine/core";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { BsDownload, BsListCheck } from "react-icons/bs";
import { CgRename } from "react-icons/cg";
import { FaShare } from "react-icons/fa6";
import { FcDocument, FcFolder, FcImageFile } from "react-icons/fc";
import { GoChevronRight } from "react-icons/go";
import { HiMenu } from "react-icons/hi";
import { LuShare2 } from "react-icons/lu";
import { MdClose, MdOutlineMoreHoriz } from "react-icons/md";
import { RiListCheck } from "react-icons/ri";
import { useWibuRealtime } from "wibu-realtime";
import { funDeleteDocument, funGetAllDocument, funRenameDocument, } from "../lib/api_document";
import { IDataDocument, IJalurItem } from "../lib/type_document";
import { globalRefreshDocument } from "../lib/val_document";
import DrawerMenuDocumentDivision from "./drawer_menu_document_division";
import DrawerMore from "./drawer_more";
import DrawerShareDocument from "./drawer_share_document";

export default function NavbarDocumentDivision() {
  const router = useRouter();
  const param = useParams<{ id: string }>();
  const [isOpenModalView, setOpenModalView] = useState(false);
  const [isExtension, setExtension] = useState("");
  const [idStorage, setIdStorage] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [rename, setRename] = useState(false);
  const [share, setShare] = useState(false);
  const [more, setMore] = useState(false);
  const [shareSelected, setShareSelected] = useState(false);
  const [copyAllowed, setCopyAllowed] = useState(true);
  const searchParams = useSearchParams();
  const path = searchParams.get("path");
  const [dataDocument, setDataDocument] = useState<IDataDocument[]>([]);
  const [dataJalur, setDataJalur] = useState<IJalurItem[]>([]);
  const refresh = useHookstate(globalRefreshDocument);
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [dariSelectAll, setDariSelectAll] = useState(false);
  const isMobile = useMediaQuery("(max-width: 369px)");
  const isMobile2 = useMediaQuery("(max-width: 496px)");
  const tema = useHookstate(TEMA);
  const [loading, setLoading] = useState(true);
  const [loadingRename, setLoadingRename] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [dataRealTime, setDataRealtime] = useWibuRealtime({
    WIBU_REALTIME_TOKEN: keyWibu,
    project: "sdm"
  })
  const [bodyRename, setBodyRename] = useState({
    id: "",
    name: "",
    path: "",
    idDivision: param.id,
    extension: "",
  });

  const handleCheckboxChange = (index: number) => {
    setDariSelectAll(false);
    if (selectedFiles.some((i: any) => i.id == dataDocument[index].id)) {
      setSelectedFiles(
        selectedFiles.filter((i: any) => i.id != dataDocument[index].id)
      );
    } else {
      setSelectedFiles([
        ...selectedFiles,
        {
          id: dataDocument[index].id,
          name: dataDocument[index].name,
          path: dataDocument[index].path,
          extension: dataDocument[index].extension,
          category: dataDocument[index].category,
          share: dataDocument[index].share,
          idStorage: dataDocument[index].idStorage,
        },
      ]);
    }
  };

  function cek() {
    if (selectedFiles.length == dataDocument.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }

    const shareSelected = selectedFiles.some((i: any) => i?.share == true);
    if (shareSelected) {
      setShareSelected(true);
    } else {
      setShareSelected(false);
    }

    const cek = selectedFiles.some((i: any) => i?.category == "FOLDER");
    if (cek || shareSelected || selectedFiles.length > 1) {
      setCopyAllowed(false);
    } else {
      setCopyAllowed(true);
    }
  }

  const handleSelectAll = () => {
    if (!selectAll) {
      setDariSelectAll(false);
      for (let index = 0; index < dataDocument.length; index++) {
        if (!selectedFiles.some((i: any) => i.id == dataDocument[index].id)) {
          const newArr = {
            id: dataDocument[index].id,
            name: dataDocument[index].name,
            path: dataDocument[index].path,
            extension: dataDocument[index].extension,
            category: dataDocument[index].category,
            share: dataDocument[index].share,
            idStorage: dataDocument[index].idStorage,
          };
          setSelectedFiles((selectedFiles: any) => [...selectedFiles, newArr]);
        }
      }
    } else {
      setDariSelectAll(true);
      setSelectedFiles([]);
    }
  };

  const handleBatal = () => {
    setSelectedFiles([]);
    setSelectAll(false);
    setDariSelectAll(false);
  };

  async function onConfirmDelete(val: boolean) {
    try {
      if (val) {
        setLoadingDelete(true)
        const respon = await funDeleteDocument(selectedFiles);
        if (respon.success) {
          getOneData(false);
          setDataRealtime([{
            category: "division-document",
            id: path,
          }])
        } else {
          toast.error(respon.message);
        }
        handleBatal();
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus item, coba lagi nanti");
    } finally {
      setLoadingDelete(false)
      setIsDelete(false);
    }
  }

  async function onRenameSubmit() {
    try {
      setLoadingRename(true);
      const res = await funRenameDocument(bodyRename);
      if (res.success) {
        setDataRealtime([{
          category: "division-document",
          id: path,
        }])
        getOneData(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengganti nama item, coba lagi nanti");
    } finally {
      setLoadingRename(false)
      setSelectedFiles([]);
      setDariSelectAll(false);
      setRename(false);
    }

  }

  useShallowEffect(() => {
    if (dataRealTime && dataRealTime.some((i: any) => i.category == 'division-document' && i.id == path)) {
      getOneData(false)
    }
  }, [dataRealTime])

  async function getOneData(loading: boolean) {
    try {
      setLoading(loading);
      const respon = await funGetAllDocument(
        "?division=" + param.id + "&path=" + path
      );
      if (respon.success) {
        setDataDocument(respon.data);
        setDataJalur(respon.jalur);
      } else {
        toast.error(respon.message);
        setDataDocument([]);
        setDataJalur([]);
      }
      const res = await funGetDivisionById(param.id);
      if (res.success) {
        setName(res.data.division.name);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan item, coba lagi nanti");
    } finally {
      setLoading(false);
    }
  }

  function resetRefresh() {
    refresh.set(false);
    setOpen(false);
    setMore(false);
    setShare(false);
    handleBatal();
  }

  useShallowEffect(() => {
    cek();
  }, [selectedFiles]);

  useShallowEffect(() => {
    getOneData(true);
    resetRefresh();
  }, [param.id, path, refresh.get()]);

  function onChooseRename() {
    setBodyRename({
      ...bodyRename,
      id: selectedFiles[0].id,
      name: selectedFiles[0].name,
      path: selectedFiles[0].path,
      extension: selectedFiles[0].extension,
    });
    setRename(true);
  }

  const onDownload = async () => {
    try {
      const fileUrl = `https://wibu-storage.wibudev.com/api/files/${selectedFiles[0].idStorage}`;
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      // Create a link element, use Blob URL
      const link = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = `${selectedFiles[0].name}.${selectedFiles[0].extension}`; // Nama file yang akan diunduh
      document.body.appendChild(link);
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box>
      {(selectedFiles.length > 0 || dariSelectAll) && (
        <>
          <Box
            h={90}
            bg={tema.get().utama}
            pos={"fixed"}
            top={0}
            w={"100%"}
            style={{
              maxWidth: rem(550),
              zIndex: 999,
            }}
          >
            <Flex
              justify={"space-between"}
              ml={30}
              mr={30}
              align={"center"}
              h={"100%"}
            >
              <ActionIcon
                variant="transparent"
                aria-label="Settings"
                onClick={() => handleBatal()}
              >
                <MdClose size={25} color="white" />
              </ActionIcon>
              <Text fz={15} c={"white"}>
                {selectedFiles.length > 0
                  ? selectedFiles.length + " item terpilih"
                  : "Pilih Item"}
              </Text>
              <ActionIcon
                variant="transparent"
                aria-label="Settings"
                onClick={() => handleSelectAll()}
              >
                {selectAll ? (
                  <RiListCheck size={25} color="white" />
                ) : (
                  <BsListCheck size={25} color="white" />
                )}
              </ActionIcon>
            </Flex>
          </Box>
          <Box
            h={70}
            bg={tema.get().utama}
            pos={"fixed"}
            bottom={0}
            w={"100%"}
            style={{
              maxWidth: rem(550),
              zIndex: 999,
            }}
          >
            <Flex justify={"center"} align={"center"} h={"100%"} w={"100%"}>
              <SimpleGrid cols={{ base: 5, sm: 5, lg: 5 }} spacing="xs">
                <Flex
                  justify={"center"}
                  align={"center"}
                  direction={"column"}
                  onClick={() => {
                    if (selectedFiles.length > 0 && copyAllowed) {
                      onDownload();
                    }
                  }}
                >
                  <BsDownload
                    size={20}
                    color={
                      selectedFiles.length > 0 && copyAllowed
                        ? "white"
                        : "#656060"
                    }
                  />
                  <Text
                    fz={12}
                    ta={"center"}
                    c={
                      selectedFiles.length > 0 && copyAllowed
                        ? "white"
                        : "#656060"
                    }
                  >
                    Unduh
                  </Text>
                </Flex>
                <Flex justify={"center"} align={"center"} direction={"column"}>
                  <ActionIcon
                    variant="subtle"
                    aria-label="delete"
                    onClick={
                      selectedFiles.length > 0 && !shareSelected
                        ? () => setIsDelete(true)
                        : undefined
                    }
                  >
                    <AiOutlineDelete
                      size={20}
                      color={
                        selectedFiles.length > 0 && !shareSelected
                          ? "white"
                          : "#656060"
                      }
                    />
                  </ActionIcon>
                  <Text
                    fz={12}
                    ta={"center"}
                    c={
                      selectedFiles.length > 0 && !shareSelected
                        ? "white"
                        : "#656060"
                    }
                  >
                    Hapus
                  </Text>
                </Flex>
                <Flex justify={"center"} align={"center"} direction={"column"}>
                  <ActionIcon
                    variant="subtle"
                    aria-label="rename"
                    onClick={
                      selectedFiles.length == 1 && !shareSelected
                        ? () => onChooseRename()
                        : undefined
                    }
                  >
                    <CgRename
                      size={20}
                      color={
                        selectedFiles.length == 1 && !shareSelected
                          ? "white"
                          : "#656060"
                      }
                    />
                  </ActionIcon>
                  <Text
                    fz={12}
                    ta={"center"}
                    c={
                      selectedFiles.length == 1 && !shareSelected
                        ? "white"
                        : "#656060"
                    }
                  >
                    Ganti Nama
                  </Text>
                </Flex>
                <Flex justify={"center"} align={"center"} direction={"column"}>
                  <ActionIcon
                    variant="subtle"
                    aria-label="share"
                    onClick={
                      selectedFiles.length > 0 && !shareSelected
                        ? () => setShare(true)
                        : undefined
                    }
                  >
                    <LuShare2
                      size={20}
                      color={
                        selectedFiles.length > 0 && !shareSelected
                          ? "white"
                          : "#656060"
                      }
                    />
                  </ActionIcon>
                  <Text
                    fz={12}
                    ta={"center"}
                    c={
                      selectedFiles.length > 0 && !shareSelected
                        ? "white"
                        : "#656060"
                    }
                  >
                    Bagikan
                  </Text>
                </Flex>
                <Flex justify={"center"} align={"center"} direction={"column"}>
                  <ActionIcon
                    variant="subtle"
                    aria-label="share"
                    onClick={
                      selectedFiles.length > 0 && !shareSelected
                        ? () => setMore(true)
                        : undefined
                    }
                  >
                    <MdOutlineMoreHoriz
                      size={20}
                      color={
                        selectedFiles.length > 0 && !shareSelected
                          ? "white"
                          : "#656060"
                      }
                    />
                  </ActionIcon>
                  <Text
                    fz={12}
                    ta={"center"}
                    c={
                      selectedFiles.length > 0 && !shareSelected
                        ? "white"
                        : "#656060"
                    }
                  >
                    Lainnya
                  </Text>
                </Flex>
              </SimpleGrid>
            </Flex>
          </Box>
        </>
      )}

      <LayoutNavbarNew
        back={`/division/${param.id}/`}
        title={name}
        menu={
          <ActionIcon
            onClick={() => setOpen(true)}
            variant="light"
            bg={tema.get().bgIcon}
            size="lg"
            radius="lg"
            aria-label="Settings"
          >
            <HiMenu size={20} color="white" />
          </ActionIcon>
        }
      />
      <Box>
        <Box p={20} pb={100}>
          <Box>
            {isMobile2 ? (
              <Breadcrumbs
                separator={<GoChevronRight />}
                my="xs"
                style={{ cursor: "pointer" }}
              >
                {dataJalur.slice(0, 3).map((v, i) => {
                  return (
                    <Box p={5} key={i}>
                      <Text
                        onClick={() => router.push("?path=" + v.id)}

                        truncate="end"
                      >
                        {v.name}
                      </Text>
                    </Box>
                  );
                })}
                {dataJalur.length > 3 && (
                  <Menu shadow="md" width={200} position="bottom-end">
                    <Menu.Target>
                      <ActionIcon
                        variant="subtle"
                        aria-label="Settings"
                        color="rgba(0, 0, 0, 1)"
                      >
                        <MdOutlineMoreHoriz size={20} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      {dataJalur.slice(3).map((v, i) => {
                        return (
                          <Menu.Item
                            key={i}
                            onClick={() => router.push("?path=" + v.id)}
                          >
                            {v.name}
                          </Menu.Item>
                        );
                      })}
                    </Menu.Dropdown>
                  </Menu>
                )}
              </Breadcrumbs>
            ) : (
              <Breadcrumbs
                separator={<GoChevronRight />}
                my="xs"
                style={{ cursor: "pointer" }}
              >
                {dataJalur.slice(0, 4).map((v, i) => {
                  return (
                    <Box p={5} key={i}>
                      <Text
                        onClick={() => router.push("?path=" + v.id)}

                        truncate="end"
                      >
                        {v.name}
                      </Text>
                    </Box>
                  );
                })}
                {dataJalur.length > 4 && (
                  <Menu shadow="md" width={200} position="bottom-end">
                    <Menu.Target>
                      <ActionIcon
                        variant="subtle"
                        aria-label="Settings"
                        color="rgba(0, 0, 0, 1)"
                      >
                        <MdOutlineMoreHoriz size={25} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      {dataJalur.slice(4).map((v, i) => {
                        return (
                          <Menu.Item
                            key={i}
                            onClick={() => router.push("?path=" + v.id)}
                          >
                            {v.name}
                          </Menu.Item>
                        );
                      })}
                    </Menu.Dropdown>
                  </Menu>
                )}
              </Breadcrumbs>
            )}
          </Box>
          {loading ? (
            <Group align="center">
              <Skeleton height={15} width={100} />
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
                          <Skeleton
                            circle
                            height={isMobile ? 20 : 30}
                            width={isMobile ? 20 : 30}
                          />
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
                    height: "60vh",
                  }}
                >
                  <Text c="dimmed" ta={"center"} fs={"italic"}>
                    Tidak ada Dokumen
                  </Text>
                </Box>
              ) : (
                dataDocument.map((v, i) => {
                  const isSelected = selectedFiles.some(
                    (i: any) => i?.id == v.id
                  );
                  return (
                    <Box key={i}>
                      <Box mt={10} mb={10}>
                        <Grid align="center">
                          <Grid.Col
                            span={{
                              base: 1,
                              xs: 1,
                              sm: 1,
                              md: 1,
                              lg: 1,
                              xl: 1,
                            }}
                            onClick={() => {
                              if (
                                v.category == "FOLDER" &&
                                selectedFiles.length == 0 &&
                                !dariSelectAll
                              ) {
                                router.push("?path=" + v.id);
                              } else if (
                                v.category == "FILE" &&
                                selectedFiles.length == 0 &&
                                !dariSelectAll
                              ) {
                                setExtension(v.extension);
                                setIdStorage(v.idStorage);
                                setOpenModalView(true);
                              }
                            }}
                          >
                            <Group>
                              <Box>
                                {v.share ? (
                                  <Indicator
                                    offset={15}
                                    withBorder
                                    inline
                                    color={tema.get().bgIcon}
                                    position="bottom-end"
                                    label={<FaShare />}
                                    size={25}
                                  >
                                    {v.category == "FOLDER" ? (
                                      <FcFolder size={isMobile ? 40 : 50} />
                                    ) : v.extension == "pdf" ||
                                      v.extension == "csv" ? (
                                      <FcDocument size={isMobile ? 40 : 50} />
                                    ) : (
                                      <FcImageFile size={isMobile ? 40 : 50} />
                                    )}
                                  </Indicator>
                                ) : (
                                  <>
                                    {v.category == "FOLDER" ? (
                                      <FcFolder size={isMobile ? 40 : 50} />
                                    ) : v.extension == "pdf" ||
                                      v.extension == "csv" ? (
                                      <FcDocument size={isMobile ? 40 : 50} />
                                    ) : (
                                      <FcImageFile size={isMobile ? 40 : 50} />
                                    )}
                                  </>
                                )}
                              </Box>
                            </Group>
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
                            <Group justify="space-between" align="center">
                              <Flex
                                direction={"column"}
                                onClick={() => {
                                  if (
                                    v.category == "FOLDER" &&
                                    selectedFiles.length == 0 &&
                                    !dariSelectAll
                                  ) {
                                    router.push("?path=" + v.id);
                                  } else if (
                                    v.category == "FILE" &&
                                    selectedFiles.length == 0 &&
                                    !dariSelectAll
                                  ) {
                                    setExtension(v.extension);
                                    setIdStorage(v.idStorage);
                                    setOpenModalView(true);
                                  }
                                }}
                              >
                                <Box
                                  w={{
                                    base: isMobile ? 200 : 230,
                                    xl: 380,
                                    md: 380,
                                    sm: 380,
                                    xs: 380,
                                  }}
                                >
                                  <Text lineClamp={1} pl={isMobile2 ? 30 : 25}>
                                    {v.category == "FOLDER"
                                      ? v.name
                                      : v.name + "." + v.extension}
                                  </Text>
                                  <Text fz={10} pl={isMobile2 ? 30 : 25}>{v.updatedAt}</Text>
                                </Box>
                              </Flex>
                              <Checkbox
                                color={tema.get().utama}
                                radius="lg"
                                size={isMobile ? "sm" : "md"}
                                checked={isSelected}
                                onChange={() => handleCheckboxChange(i)}
                              />
                            </Group>
                          </Grid.Col>
                        </Grid>
                      </Box>
                      <Divider size="xs" />
                    </Box>
                  );
                })
              )}
            </Box>
          )}
        </Box>
      </Box>

      <LayoutDrawer
        opened={isOpen}
        title={"Menu"}
        onClose={() => setOpen(false)}
      >
        <DrawerMenuDocumentDivision />
      </LayoutDrawer>

      {/* MODAL KONFIRMASI DELETE */}
      <LayoutModal
        loading={loadingDelete}
        opened={isDelete}
        onClose={() => setIsDelete(false)}
        description="Apakah Anda yakin ingin menghapus item?"
        onYes={(val) => {
          onConfirmDelete(val);
        }}
      />

      {/* MODAL RENAME */}
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
        opened={rename}
        onClose={() => setRename(false)}
        centered
        withCloseButton={false}
      >
        <Box p={20}>
          <Text ta={"center"} fw={"bold"}>
            Ganti Nama Item
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
              placeholder="Nama item"
              value={bodyRename.name}
              onChange={(e) =>
                setBodyRename({ ...bodyRename, name: e.target.value })
              }
            />
          </Box>
          <Grid mt={40}>
            <Grid.Col span={6}>
              <Button
                variant="subtle"
                fullWidth
                color="#969494"
                onClick={() => setRename(false)}
              >
                Batalkan
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                loading={loadingRename}
                variant="subtle"
                fullWidth
                color={tema.get().utama}
                onClick={(val) => onRenameSubmit()}
              >
                Simpan
              </Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Modal>

      <LayoutDrawer
        opened={share}
        title={"Bagikan"}
        onClose={() => setShare(false)}
        size="lg"
      >
        <DrawerShareDocument data={selectedFiles} />
      </LayoutDrawer>

      <LayoutDrawer opened={more} title={""} onClose={() => setMore(false)}>
        <DrawerMore data={selectedFiles} />
      </LayoutDrawer>

      <LayoutModalViewFile
        opened={isOpenModalView}
        onClose={() => setOpenModalView(false)}
        file={idStorage}
        extension={isExtension}
        fitur="dokumen"
      />
    </Box>
  );
}
