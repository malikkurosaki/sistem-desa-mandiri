"use client";
import { globalRole, keyWibu, TEMA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { funGetUserByCookies } from "@/module/auth";
import { funGetAllGroup, IDataGroup } from "@/module/group";
import { funGetAllPosition } from "@/module/position/lib/api_position";
import { useHookstate } from "@hookstate/core";
import { Avatar, Box, Button, Indicator, rem, Select, Stack, Text, TextInput } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa6";
import { valueRoleUser } from "../../lib/val_user";
import { funCreateMember } from "../lib/api_member";
import { IDataPositionMember, IDataROleMember } from "../lib/type_member";
import { useWibuRealtime } from "wibu-realtime";

export default function CreateMember() {
  const router = useRouter();
  const [isModal, setModal] = useState(false);
  const [loadingKonfirmasi, setLoadingKonfirmasi] = useState(false);
  const [listGroup, setListGorup] = useState<IDataGroup[]>([]);
  const [listPosition, setListPosition] = useState<IDataPositionMember[]>([]);
  const [listUserRole, setListUserRole] = useState<IDataROleMember[]>([]);
  const roleLogin = useHookstate(globalRole)
  const [img, setIMG] = useState<any | null>()
  const [imgForm, setImgForm] = useState<any>()
  const openRef = useRef<() => void>(null)
  const tema = useHookstate(TEMA)
  const [dataRealTime, setDataRealtime] = useWibuRealtime({
    WIBU_REALTIME_TOKEN: keyWibu,
    project: "sdm"
  })
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


  async function onSubmit(val: boolean) {
    try {
      setLoadingKonfirmasi(true)
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
        setDataRealtime([{
          category: "data-member",
          group: res.data.idGroup,
        }])
        toast.success(res.message);
        router.push("/member?active=true");
      } else {
        toast.error(res.message);
      }
      setModal(false);
    } catch (error) {
      toast.error("Error");
    } finally {
      setLoadingKonfirmasi(false)
      setModal(false);
    }
  }

  useShallowEffect(() => {
    getAllGroup();
    getAllUserRole();
    getLogin()
  }, []);

  function onCheck() {
    const cek = checkAll()
    if (!cek)
      return false
    setModal(true)
  }

  function checkAll() {
    let nilai = true

    if (listData.nik === "" || listData.nik.length !== 16) {
      setTouched(touched => ({ ...touched, nik: true }))
      nilai = false
    }

    if (listData.name === "") {
      setTouched(touched => ({ ...touched, name: true }))
      nilai = false
    }

    if (listData.phone == "" || !(listData.phone.length >= 10 && listData.phone.length <= 15)) {
      setTouched(touched => ({ ...touched, phone: true }))
      nilai = false
    }

    if (listData.email == "" || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(listData.email)) {
      setTouched(touched => ({ ...touched, email: true }))
      nilai = false
    }

    if (listData.gender == "" || String(listData.gender) == "null") {
      setTouched(touched => ({ ...touched, gender: true }))
      nilai = false
    }

    if (roleLogin.get() == "supadmin" && (listData.idGroup == "" || String(listData.idGroup) == "null")) {
      setTouched(touched => ({ ...touched, idGroup: true }))
      nilai = false
    }

    if (listData.idPosition === "" || String(listData.idPosition) == "null") {
      setTouched(touched => ({ ...touched, idPosition: true }))
      nilai = false
    }

    if (listData.idUserRole === "" || String(listData.idUserRole) == "null") {
      setTouched(touched => ({ ...touched, idUserRole: true }))
      nilai = false
    }

    return nilai

  }


  function onValidation(kategori: string, val: any) {
    if (kategori == 'nik') {
      setListData({ ...listData, nik: val })
      if (val === "" || val.length !== 16) {
        setTouched({ ...touched, nik: true })
      } else {
        setTouched({ ...touched, nik: false })
      }
    } else if (kategori == 'name') {
      setListData({ ...listData, name: val })
      if (val === "") {
        setTouched({ ...touched, name: true })
      } else {
        setTouched({ ...touched, name: false })
      }
    } else if (kategori == 'phone') {
      setListData({ ...listData, phone: val })
      if (val == "" || !(val.length >= 10 && val.length <= 15)) {
        setTouched({ ...touched, phone: true })
      } else {
        setTouched({ ...touched, phone: false })
      }
    } else if (kategori == 'email') {
      setListData({ ...listData, email: val })
      if (val == "" || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) {
        setTouched({ ...touched, email: true })
      } else {
        setTouched({ ...touched, email: false })
      }
    } else if (kategori == 'gender') {
      setListData({ ...listData, gender: val })
      if (val == "" || String(val) == "null") {
        setTouched({ ...touched, gender: true })
      } else {
        setTouched({ ...touched, gender: false })
      }
    } else if (kategori == 'idGroup') {
      setListData(listData => ({ ...listData, idGroup: val, }))
      if (val === "" || String(val) == "null") {
        setTouched(touched => ({ ...touched, idGroup: true }))
      } else {
        setTouched({ ...touched, idGroup: false })
      }
    } else if (kategori == 'idPosition') {
      setListData(listData => ({ ...listData, idPosition: val }))
      if (val === "" || String(val) == "null") {
        setTouched(touched => ({ ...touched, idPosition: true }))
      } else {
        setTouched({ ...touched, idPosition: false })
      }
    } else if (kategori == 'idUserRole') {
      setListData({ ...listData, idUserRole: val })
      if (val === "" || String(val) == "null") {
        setTouched({ ...touched, idUserRole: true })
      } else {
        setTouched({ ...touched, idUserRole: false })
      }
    }
  }

  async function changeGrup(val: any) {
    setListPosition([]);
    onValidation('idGroup', val)
    onValidation('idPosition', '')
    getAllPosition(val);
  }


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
            onChange={(val: any) => { changeGrup(val) }}
            error={
              touched.idGroup && (
                listData.idGroup == "" || String(listData.idGroup) == "null" ? "Grup Tidak Boleh Kosong" : null
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
          onChange={(val: any) => { onValidation('idPosition', val) }}
          value={listData.idPosition == "" ? null : listData.idPosition}
          error={
            touched.idPosition && (
              listData.idPosition == "" || String(listData.idPosition) == "null" ? "Jabatan Tidak Boleh Kosong" : null
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
          onChange={(val: any) => { onValidation('idUserRole', val) }}
          error={
            touched.idUserRole && (
              listData.idUserRole == "" || String(listData.idUserRole) == "null" ? "Role Tidak Boleh Kosong" : null
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
          onChange={(e) => { onValidation('nik', e.target.value) }}
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
          onChange={(e) => { onValidation('name', e.target.value) }}
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
          onChange={(e) => { onValidation('email', e.target.value) }}
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
          onChange={(e) => { onValidation('phone', e.target.value); }}
          error={
            touched.phone && (
              listData.phone == "" ? "Nomor Telepon Tidak Boleh Kosong" :
                listData.phone.length < 10 ? "Nomor Telepon Tidak Valid" : null
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
          onChange={(val: any) => { onValidation('gender', val) }}
          error={
            touched.gender && (
              listData.gender == "" || String(listData.gender == "null") ? "Jenis Kelamin Tidak Boleh Kosong" : null
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
          onClick={() => { onCheck() }}
        >
          Simpan
        </Button>
      </Box>
      <LayoutModal
        loading={loadingKonfirmasi}
        opened={isModal}
        onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin menambahkan data?"
        onYes={(val) => {
          if (val) {
            onSubmit(val);
          } else {
            setModal(false);
          }
        }}
      />
    </Box>
  );
}
