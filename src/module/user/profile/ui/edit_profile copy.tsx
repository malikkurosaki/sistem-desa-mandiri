"use client";
import { LayoutNavbarNew, TEMA } from "@/module/_global";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Indicator,
  Modal,
  rem,
  Select,
  Skeleton,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import toast from "react-hot-toast";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { useRef, useState } from "react";
import { IEditDataProfile, IProfileById } from "../lib/type_profile";
import {
  funEditProfileByCookies,
  funGetProfileByCookies,
} from "../lib/api_profile";
import { useShallowEffect } from "@mantine/hooks";
import { FaCamera, FaShare } from "react-icons/fa6";
import { Dropzone } from "@mantine/dropzone";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useHookstate } from "@hookstate/core";
import { useForm } from "@mantine/form";

export default function EditProfileCopy() {
  const [isValModal, setValModal] = useState(false);
  const [isDataEdit, setDataEdit] = useState<IProfileById[]>([]);
  const openRef = useRef<() => void>(null);
  const [img, setIMG] = useState<any | null>();
  const [imgForm, setImgForm] = useState<any>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const tema = useHookstate(TEMA);

  const [data, setData] = useState<IEditDataProfile>({
    id: "",
    nik: "",
    name: "",
    phone: "",
    email: "",
    gender: "",
    img: "",
  });

  async function getAllProfile() {
    try {
      setLoading(true);
      const res = await funGetProfileByCookies();
      setData(res.data);
      setIMG(`https://wibu-storage.wibudev.com/api/files/${res.data.img}`);
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useShallowEffect(() => {
    getAllProfile();
  }, []);

  async function onEditProfile(val: boolean) {
    try {
      if (val) {
        const fd = new FormData();
        fd.append("file", imgForm);
        fd.append("data", JSON.stringify(data));

        const res = await funEditProfileByCookies(fd);
        if (res.success) {
          setValModal(false);
          toast.success(res.message);
          router.push("/profile");
        } else {
          toast.error(res.message);
        }
      }
      setValModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Gagal edit profil, coba lagi nanti");
    }
  }

  return (
    <Box>
      <LayoutNavbarNew back="" title="Edit Profill" menu="" />
        <Stack
          align="center"
          justify="center"
          gap="xs"
          pt={30}
          px={20}
          pb={100}
        >
          <Dropzone
            openRef={openRef}
            onDrop={async (files) => {
              if (!files || _.isEmpty(files))
                return toast.error("Tidak ada gambar yang dipilih");
              setImgForm(files[0]);
              const buffer = URL.createObjectURL(
                new Blob([new Uint8Array(await files[0].arrayBuffer())])
              );
              setIMG(buffer);
            }}
            activateOnClick={false}
            maxSize={1 * 1024 ** 2}
            accept={["image/png", "image/jpeg", "image/heic"]}
            onReject={(files) => {
              return toast.error(
                "File yang diizinkan: .png, .jpg, dan .heic  dengan ukuran maksimal 1 MB"
              );
            }}
          ></Dropzone>

          {loading ? (
            <Skeleton height={150} width={150} radius={"100"} />
          ) : (
            <Indicator
              offset={20}
              withBorder
              inline
              color={tema.get().bgFiturHome}
              position="bottom-end"
              label={<FaCamera size={20} />}
              size={40}
              onClick={() => openRef.current?.()}
            >
              <Avatar
                size="150"
                radius={"100"}
                src={img}
                style={{
                  border: `1px solid ${"#C1BFBFFF"}`,
                }}
              />
            </Indicator>
          )}
          {loading ? (
            <>
              <Skeleton height={40} mt={20} radius={30} />
              <Skeleton height={40} mt={20} radius={30} />
              <Skeleton height={40} mt={20} radius={30} />
              <Skeleton height={40} mt={20} radius={30} />
              <Skeleton height={40} mt={20} radius={30} />
            </>
          ) : (
            <>
              <TextInput
                size="md"
                type="number"
                radius={30}
                placeholder="NIK"
                withAsterisk
                label="NIK"
                w={"100%"}
                styles={{
                  input: {
                    color: tema.get().utama,
                    borderRadius: tema.get().utama,
                    borderColor: tema.get().utama,
                  },
                }}
                onChange={(e) => {
                  setData({ ...data, nik: e.target.value });
                }}
                value={data.nik}
              />
              <TextInput
                size="md"
                type="text"
                radius={30}
                placeholder="Nama"
                withAsterisk
                  label="Nama"
                  value={data.name}
                w={"100%"}
                styles={{
                  input: {
                    color: tema.get().utama,
                    borderRadius: tema.get().utama,
                    borderColor: tema.get().utama,
                  },
                }}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
              />
              <TextInput
                size="md"
                type="email"
                radius={30}
                placeholder="Email"
                withAsterisk
                label="Email"
                w={"100%"}
                styles={{
                  input: {
                    color: tema.get().utama,
                    borderRadius: tema.get().utama,
                    borderColor: tema.get().utama,
                  },
                }}
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
                value={data.email}
              />
              <TextInput
                size="md"
                type="number"
                radius={30}
                placeholder="8xx xxxx xxxx"
                withAsterisk
                label="Nomor Telepon"
                w={"100%"}
                styles={{
                  input: {
                    color: tema.get().utama,
                    borderRadius: tema.get().utama,
                    borderColor: tema.get().utama,
                  },
                }}
                leftSection={<Text>+62</Text>}
                onChange={(e) => {
                  setData({ ...data, phone: e.target.value });
                }}
                value={data.phone}
              />
              <Select
                placeholder="Jenis Kelamin"
                label="Jenis Kelamin"
                w={"100%"}
                size="md"
                required
                withAsterisk
                radius={30}
                styles={{
                  input: {
                    color: tema.get().utama,
                    borderRadius: tema.get().utama,
                    borderColor: tema.get().utama,
                  },
                }}
                data={[
                  {
                    value: "M",
                    label: "Laki-laki",
                  },
                  {
                    value: "F",
                    label: "Perempuan",
                  },
                ]}
                onChange={(val: any) => {
                  setData({ ...data, gender: val });
                }}
                value={data.gender}
              />
            </>
          )}
        </Stack>
        <Box
          pos={"fixed"}
          bottom={0}
          p={rem(20)}
          w={"100%"}
          style={{
            maxWidth: rem(550),
            zIndex: 999,
            backgroundColor: `${tema.get().bgUtama}`,
          }}
        >
          {loading ? (
            <Skeleton height={50} radius={30} />
          ) : (
            <Button
              c={"white"}
              bg={tema.get().utama}
              size="md"
              radius={30}
              fullWidth
                type="submit"
                
            >
              Simpan
            </Button>
          )}
        </Box>
      <LayoutModal
        opened={isValModal}
        onClose={() => setValModal(false)}
        description="Apakah Anda yakin ingin
        melakukan perubahan data?"
        onYes={(val) => {
          onEditProfile(val);
        }}
      />
    </Box>
  );
}
