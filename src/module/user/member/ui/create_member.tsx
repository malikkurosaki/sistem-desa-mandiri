"use client";
import { API_ADDRESS, WARNA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { funGetAllGroup, IDataGroup } from "@/module/group";
import { Box, Button, Select, Stack, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiUser } from "react-icons/hi2";
import { IDataPositionMember, IDataROleMember } from "../lib/type_member";
import { funGetAllPosition } from "@/module/position/lib/api_position";
import { funCreateMember, funGetRoleUser } from "../lib/api_member";

export default function CreateMember() {
  const router = useRouter();
  const [isModal, setModal] = useState(false);
  const [listGroup, setListGorup] = useState<IDataGroup[]>([]);
  const [listPosition, setListPosition] = useState<IDataPositionMember[]>([]);
  const [listUserRole, setListUserRole] = useState<IDataROleMember[]>([]);

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

  async function getAllPosition(val: any) {
    try {
      if (val != null) {
        const res = await funGetAllPosition(
          "?active=true" + "&group=" + `${val}`
        );
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
      const res = await funGetRoleUser();
      setListUserRole(res.data);
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
      const res = await funCreateMember({
        nik: listData.nik,
        name: listData.name,
        phone: listData.phone,
        email: listData.email,
        gender: listData.gender,
        idGroup: listData.idGroup,
        idPosition: listData.idPosition,
        idUserRole: listData.idUserRole,
      });

      if (res.success) {
        toast.success(res.message);
        setModal(false);
        router.push("/member?active=true");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Error");
    } finally {
      setModal(false);
    }
  }

  useEffect(() => {
    getAllGroup();
    getAllUserRole();
  }, []);


  return (
    <Box>
      <Stack align="center" justify="center" gap="xs" pt={30} px={20}>
        <Box
          bg={WARNA.biruTua}
          py={30}
          px={50}
          style={{
            borderRadius: 10,
          }}
        >
          <HiUser size={100} color={WARNA.bgWhite} />
        </Box>
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
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
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
          }}
        />
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
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
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
          onChange={(val: any) =>
            setListData({
              ...listData,
              idPosition: val,
            })
          }
          value={listData.idPosition == "" ? null : listData.idPosition}
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
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
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
          onChange={(val: any) =>
            setListData({
              ...listData,
              idUserRole: val,
            })
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
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
            },
          }}
          onChange={(event: any) =>
            setListData({
              ...listData,
              nik: event.target.value,
            })
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
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
            },
          }}
          onChange={(event: any) =>
            setListData({
              ...listData,
              name: event.target.value,
            })
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
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
            },
          }}
          onChange={(event: any) =>
            setListData({
              ...listData,
              email: event.target.value,
            })
          }
        />
        <TextInput
          size="md"
          type="number"
          radius={30}
          placeholder="+62...."
          withAsterisk
          label="Nomor Telepon"
          w={"100%"}
          styles={{
            input: {
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
            },
          }}
          onChange={(event: any) =>
            setListData({
              ...listData,
              phone: event.target.value,
            })
          }
        />
        <Select
          placeholder="Pilih Gender"
          label="Gender"
          w={"100%"}
          size="md"
          required
          withAsterisk
          radius={30}
          styles={{
            input: {
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
            },
          }}
          data={[
            { value: "M", label: "Laki-laki" },
            { value: "F", label: "Perempuan" },
          ]}
          onChange={(val: any) =>
            setListData({
              ...listData,
              gender: val,
            })
          }
        />
      </Stack>
      <Box mt={30} mx={20} pb={20}>
        <Button
          c={"white"}
          bg={WARNA.biruTua}
          size="md"
          radius={30}
          fullWidth
          onClick={() => setModal(true)}
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
