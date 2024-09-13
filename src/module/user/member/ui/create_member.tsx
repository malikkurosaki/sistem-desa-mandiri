"use client";
import { globalRole, TEMA, WARNA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { funGetAllGroup, IDataGroup } from "@/module/group";
import { Avatar, Box, Button, Indicator, rem, Select, Stack, Text, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { IDataPositionMember, IDataROleMember } from "../lib/type_member";
import { funGetAllPosition } from "@/module/position/lib/api_position";
import { funCreateMember } from "../lib/api_member";
import _ from "lodash";
import { useHookstate } from "@hookstate/core";
import { useShallowEffect } from "@mantine/hooks";
import { funGetUserByCookies } from "@/module/auth";
import { valueRoleUser } from "../../lib/val_user";
import { FaCamera } from "react-icons/fa6";
import { Dropzone } from "@mantine/dropzone";

export default function CreateMember() {
  const router = useRouter();
  const [isModal, setModal] = useState(false);
  const [listGroup, setListGorup] = useState<IDataGroup[]>([]);
  const [listPosition, setListPosition] = useState<IDataPositionMember[]>([]);
  const [listUserRole, setListUserRole] = useState<IDataROleMember[]>([]);
  const roleLogin = useHookstate(globalRole)
  const [img, setIMG] = useState<any | null>()
  const [imgForm, setImgForm] = useState<any>()
  const openRef = useRef<() => void>(null)
  const tema = useHookstate(TEMA)
  const [touched, setTouched] = useState({
    nik: false,
    name: false,
    phone: false,
    email: false,
    gender: false,
    idGroup: false,
    idPosition: false,
    idUserRole: false
  });

  const [listData, setListData] = useState({
    nik: "",
    name: "",
    phone: "",
    email: "",
    gender: "",
    idGroup: "",
    idPosition: "",
    idUserRole: "",
  });

  async function getAllGroup() {
    try {
      const response = await funGetAllGroup("?active=true");
      if (response.success) {
        setListGorup(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan grup, coba lagi nanti");
    }
  }

  async function getLogin() {
    try {
      const res = await funGetUserByCookies();
      if (roleLogin.get() != "supadmin") {
        getAllPosition(res.idGroup)
      }

    } catch (error) {
      console.error(error);
    }
  }

  async function getAllPosition(val: any) {
    try {
      if (val != null) {
        const res = await funGetAllPosition("?active=true" + "&group=" + `${val}`);
        setListPosition(res.data);
      } else {
        setListPosition([]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getAllUserRole() {
    try {
      setListUserRole(valueRoleUser.filter((v) => v.login == roleLogin.get())[0]?.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function changeGrup(val: any) {
    setListPosition([]);
    setListData({
      ...listData,
      idGroup: val,
      idPosition: "",
    });

    getAllPosition(val);
  }

  async function onSubmit(val: boolean) {
    try {
      if (_.isEmpty(listData)) {
        return;
      }
      if (val) {
        const fd = new FormData()
        fd.append("file", imgForm)
        fd.append("data", JSON.stringify(
          {
            nik: listData.nik,
            name: listData.name,
            phone: listData.phone,
            email: listData.email,
            gender: listData.gender,
            idGroup: listData.idGroup,
            idPosition: listData.idPosition,
            idUserRole: listData.idUserRole,
          }
        ))
        const res = await funCreateMember(fd);
        if (res.success) {
          toast.success(res.message);
          setModal(false);
          router.push("/member?active=true");
        } else {
          toast.error(res.message);
        }
      }
      setModal(false);
    } catch (error) {
      toast.error("Error");
    } finally {
      setModal(false);
    }
  }

  useShallowEffect(() => {
    getAllGroup();
    getAllUserRole();
    getLogin()
  }, []);


  return (
    <Box>
      <Stack align="center" justify="center" gap="xs" pt={30} px={20} pb={100}>
        <Dropzone
          openRef={openRef}
          onDrop={async (files) => {
            if (!files || _.isEmpty(files))
              return toast.error('Tidak ada gambar yang dipilih')
            setImgForm(files[0])
            const buffer = URL.createObjectURL(new Blob([new Uint8Array(await files[0].arrayBuffer())]))
            setIMG(buffer)
          }}
          activateOnClick={false}
          maxSize={1 * 1024 ** 2}
          accept={['image/png', 'image/jpeg', 'image/heic']}
          onReject={(files) => {
            return toast.error('File yang diizinkan: .png, .jpg, dan .heic  dengan ukuran maksimal 1 MB')
          }}
        >
        </Dropzone>
        <Indicator offset={20} withBorder inline color={tema.get().bgIcon} position="bottom-end" label={<FaCamera size={20} />} size={40} onClick={() => openRef.current?.()}>
          <Avatar
            size="150"
            radius={"100"}
            src={img}
          />
        </Indicator>
        {
          roleLogin.get() == "supadmin" &&
          <Select
            placeholder="Pilih Grup"
            label="Grup"
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
            data={
              listGroup
                ? listGroup.map((data) => ({
                  value: data.id,
                  label: data.name,
                }))
                : []
            }
            onChange={(val: any) => {
              changeGrup(val);
              setTouched({ ...touched, idGroup: false })
            }}
            onBlur={() => setTouched({ ...touched, idGroup: true })}
            error={
              touched.idGroup && (
                listData.idGroup == "" ? "Grup Tidak Boleh Kosong" : null
              )
            }
          />
        }
        <Select
          placeholder="Pilih Jabatan"
          label="Jabatan"
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
          data={
            listPosition
              ? listPosition.map((data) => ({
                value: data.id,
                label: data.name,
              }))
              : []
          }
          onChange={(val: any) => {
            setListData({
              ...listData,
              idPosition: val,
            })
            setTouched({ ...touched, idPosition: false })
          }
          }
          value={listData.idPosition == "" ? null : listData.idPosition}
          onBlur={() => setTouched({ ...touched, idPosition: true })}
          error={
            touched.idPosition && (
              listData.idPosition == "" ? "Jabatan Tidak Boleh Kosong" : null
            )
          }
        />
        <Select
          placeholder="Pilih Role"
          label="User Role"
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
          data={
            listUserRole
              ? listUserRole.map((data) => ({
                value: data.id,
                label: data.name,
              }))
              : []
          }
          onChange={(val: any) => {
            setListData({
              ...listData,
              idUserRole: val,
            })
            setTouched({ ...touched, idUserRole: false })
          }
          }
          onBlur={() => setTouched({ ...touched, idUserRole: true })}
          error={
            touched.idUserRole && (
              listData.idUserRole == "" ? "Role Tidak Boleh Kosong" : null
            )
          }
        />
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
          onChange={(event: any) => {
            setListData({ ...listData, nik: event.target.value });
            setTouched({ ...touched, nik: false });
          }}
          onBlur={() => setTouched({ ...touched, nik: true })}
          error={
            touched.nik && (
              listData.nik === "" ? "NIK Tidak Boleh Kosong" :
                listData.nik.length !== 16 ? "NIK Harus 16 Karakter" : null
            )
          }
        />
        <TextInput
          size="md"
          type="text"
          radius={30}
          placeholder="Nama"
          withAsterisk
          label="Nama"
          w={"100%"}
          styles={{
            input: {
              color: tema.get().utama,
              borderRadius: tema.get().utama,
              borderColor: tema.get().utama,
            },
          }}
          onChange={(event: any) => {
            setListData({
              ...listData,
              name: event.target.value,
            })
            setTouched({ ...touched, name: false })
          }
          }
          onBlur={() => setTouched({ ...touched, name: true })}
          error={
            touched.name && (
              listData.name == "" ? "Nama Tidak Boleh Kosong" : null
            )
          }
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
          onChange={(event: any) => {
            setListData({
              ...listData,
              email: event.target.value,
            })
            setTouched({ ...touched, email: false })
          }
          }
          onBlur={() => setTouched({ ...touched, email: true })}
          error={
            touched.email && (
              listData.email == "" ? "Email Tidak Boleh Kosong" :
                !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(listData.email) ? "Email tidak valid" : null
            )
          }
        />
        <TextInput
          size="md"
          type="number"
          radius={30}
          placeholder="8xx xxxx xxxx"
          leftSection={<Text>+62</Text>}
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
          onChange={(event: any) => {
            setListData({
              ...listData,
              phone: "62" + event.target.value,
            })
            setTouched({ ...touched, phone: false })
          }
          }
          onBlur={() => setTouched({ ...touched, phone: true })}
          error={
            touched.phone && (
              listData.phone == "" ? "Nomor Telepon Tidak Boleh Kosong" :
                listData.phone.length < 10 ? "Nomor Telepon harus 10 digit" : null
            )
          }
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
            { value: "M", label: "Laki-laki" },
            { value: "F", label: "Perempuan" },
          ]}
          onChange={(val: any) => {
            setListData({
              ...listData,
              gender: val,
            })
            setTouched({ ...touched, gender: false })
          }
          }
          onBlur={() => setTouched({ ...touched, gender: true })}
          error={
            touched.gender && (
              listData.gender == "" ? "Jenis Kelamin Tidak Boleh Kosong" : null
            )
          }
        />
      </Stack>
      <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
        maxWidth: rem(550),
        zIndex: 999,
        backgroundColor: `${tema.get().bgUtama}`,
      }}>
        <Button
          c={"white"}
          bg={tema.get().utama}
          size="md"
          radius={30}
          fullWidth
          onClick={() => {
            if (
              listData.nik !== "" &&
              listData.name !== "" &&
              listData.email !== "" &&
              listData.phone !== "" &&
              listData.gender !== "" &&
              listData.idGroup !== "" &&
              listData.idPosition !== "" &&
              listData.idUserRole !== ""
            ) {
              setModal(true);
            } else {
              toast.error("Mohon lengkapi semua form");
            }
          }}
        >
          Simpan
        </Button>
      </Box>
      <LayoutModal
        opened={isModal}
        onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin menambahkan data?"
        onYes={(val) => {
          onSubmit(val);
        }}
      />
    </Box>
  );
}
