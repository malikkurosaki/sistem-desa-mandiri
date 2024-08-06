'use client'
import { API_ADDRESS, WARNA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { Box, Button, Select, Stack, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiUser } from "react-icons/hi2";

type dataMember = {
   id: string;
   nik: string;
   name: string;
   phone: string;
   email: string;
   gender: string;
   idGroup: string;
   idPosition: string;
   idUserRole: string;
}

type dataGroup = {
   id: string;
   name: string;
};
type dataPosition = {
   id: string;
   name: string;
};

type dataROleUser = {
   id: string;
   name: string;
}

export default function EditMember({ id }: { id: string | undefined }) {
   const [isModal, setModal] = useState(false)
   const router = useRouter()
   const [listGroup, setListGorup] = useState<dataGroup[]>([])
   const [listPosition, setListPosition] = useState<dataPosition[]>([])
   const [listUserRole, setListUserRole] = useState<dataROleUser[]>([])
   const [data, setData] = useState<dataMember>({
      id: "",
      nik: "",
      name: "",
      phone: "",
      email: "",
      gender: "",
      idGroup: "",
      idPosition: "",
      idUserRole: "",
   })
   const [listData, setListData] = useState<dataMember>()

   async function getAllGroup() {
      try {
         const res = await fetch(`${API_ADDRESS.apiGetAllGroup}&villageId=desa1&active=true`)
         const data = await res.json()
         setListGorup(data)
      } catch (error) {
         console.error(error)
      }
   }

   async function getOneData() {
      try {
         const res = await fetch(`${API_ADDRESS.apiGetOneUser}&userID=${id}`)
         const data = await res.json()
         setData(data)
         getAllPosition(data?.idGroup)
      } catch (error) {
         console.error(error)
      }
   }

   async function getAllPosition(val: any) {
      try {
         const res = await fetch(`${API_ADDRESS.apiGetAllPosition}&groupId=${val}&active=true`)
         const data = await res.json()
         setListPosition(data)

      } catch (error) {
         console.error(error)
      }
   }

   async function getAllUserRole() {
      try {
         const res = await fetch(`${API_ADDRESS.apiGetRoleUser}`)
         const data = await res.json()
         setListUserRole(data)
      } catch (error) {
         console.error(error)
      }
   }

   async function changeGrup(val: any) {
      setListPosition([])
      setData({
         ...data,
         idGroup: val,
         idPosition: ""
      })
      getAllPosition(val)
   }

   useShallowEffect(() => {
      getAllGroup()
      getOneData()
      getAllUserRole()
   }, [])


   async function onSubmit(val: boolean) {
      try {
         const res = await fetch(API_ADDRESS.apiUpdateUser, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               id: data.id,
               nik: data.nik,
               name: data.name,
               phone: data.phone,
               email: data.email,
               gender: data.gender,
               idGroup: data.idGroup,
               idPosition: data.idPosition,
               idUserRole: data.idUserRole
            }),
         })

         const respon = await res.json()

         if (res.status == 200) {
            toast.success(respon.message)
         } else {
            toast.error(respon.message)
         }
         router.push('/member')
      } catch (error) {
         toast.error('Error');
      }
   }

   return (
      <Box>
         <Stack
            align="center"
            justify="center"
            gap="xs"
            pt={30}
            px={20}
         >
            <Box bg={WARNA.biruTua} py={30} px={50}
               style={{
                  borderRadius: 10,
               }}>
               <HiUser size={100} color={WARNA.bgWhite} />
            </Box>
            <Select
               placeholder="Pilih Grup" label="Grup" w={"100%"} size="md" required withAsterisk radius={30}
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
                  changeGrup(val)
               }}
               value={data?.idGroup}
            />
            <Select
               placeholder="Pilih Jabatan" label="Jabatan" w={"100%"} size="md" required withAsterisk radius={30}
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
               onChange={(val: any) => setData({ ...data, idPosition: val })}
               value={(data?.idPosition == "") ? null : data.idPosition}
            />
            <Select
               placeholder="Pilih Role" label="User Role" w={"100%"} size="md" required withAsterisk radius={30}
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
               onChange={(val: any) => setData({ ...data, idUserRole: val })}
               value={data?.idUserRole}
            />
            <TextInput
               size="md" type="number" radius={30} placeholder="NIK" withAsterisk label="NIK" w={"100%"}
               styles={{
                  input: {
                     color: WARNA.biruTua,
                     borderRadius: WARNA.biruTua,
                     borderColor: WARNA.biruTua,
                  },
               }}
               onChange={(e) => setData({ ...data, nik: e.target.value })}
               value={data.nik}
            />
            <TextInput
               size="md" type="text" radius={30} placeholder="Nama" withAsterisk label="Nama" w={"100%"}
               styles={{
                  input: {
                     color: WARNA.biruTua,
                     borderRadius: WARNA.biruTua,
                     borderColor: WARNA.biruTua,
                  },
               }}
               onChange={(e) => setData({ ...data, name: e.target.value })}
               value={data.name}
            />
            <TextInput
               size="md" type="email" radius={30} placeholder="Email" withAsterisk label="Email" w={"100%"}
               styles={{
                  input: {
                     color: WARNA.biruTua,
                     borderRadius: WARNA.biruTua,
                     borderColor: WARNA.biruTua,
                  },
               }}
               onChange={(e) => setData({ ...data, email: e.target.value })}
               value={data.email}
            />
            <TextInput
               size="md" type="number" radius={30} placeholder="+62...." withAsterisk label="Nomor Telepon" w={"100%"}
               styles={{
                  input: {
                     color: WARNA.biruTua,
                     borderRadius: WARNA.biruTua,
                     borderColor: WARNA.biruTua,
                  },
               }}
               onChange={(e) => setData({ ...data, phone: e.target.value })}
               value={data.phone}
            />
            <Select
               placeholder="Pilih Gender" label="Gender" w={"100%"} size="md" required withAsterisk radius={30}
               styles={{
                  input: {
                     color: WARNA.biruTua,
                     borderRadius: WARNA.biruTua,
                     borderColor: WARNA.biruTua,
                  },
               }}
               data={
                  [
                     {
                        value: "M",
                        label: "Laki-laki"
                     },
                     {
                        value: "F",
                        label: "Perempuan"
                     }
                  ]
               }
               onChange={(val: any) => setData({ ...data, gender: val })}
               value={data.gender}
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
         <LayoutModal opened={isModal} onClose={() => setModal(false)}
            description="Apakah Anda yakin ingin mengubah data?"
            onYes={(val) => {
               if (val)
                  onSubmit(val)
               setModal(false)
            }
            } />
      </Box>
   )
}