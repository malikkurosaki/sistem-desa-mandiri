'use client'
import { globalRole, TEMA, WARNA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { funGetAllGroup, IDataGroup } from "@/module/group";
import { funGetAllPosition } from "@/module/position/lib/api_position";
import { Avatar, Box, Button, Indicator, rem, Select, Skeleton, Stack, Text, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { HiUser } from "react-icons/hi2";
import { IDataPositionMember, IDataROleMember, IEditDataMember, IFormMember } from "../lib/type_member";
import { funEditMember, funGetOneMember, funGetRoleUser } from "../lib/api_member";
import _ from "lodash";
import { Dropzone } from "@mantine/dropzone";
import { FaCamera } from "react-icons/fa6";
import { useHookstate } from "@hookstate/core";
import { valueRoleUser } from "../../lib/val_user";


export default function EditMember({ id }: { id: string }) {
   const [isModal, setModal] = useState(false)
   const router = useRouter()
   const [listGroup, setListGorup] = useState<IDataGroup[]>([])
   const [listPosition, setListPosition] = useState<IDataPositionMember[]>([])
   const [listUserRole, setListUserRole] = useState<IDataROleMember[]>([])
   const [imgForm, setImgForm] = useState<any>()
   const openRef = useRef<() => void>(null)
   const [img, setIMG] = useState<any | null>()
   const [loading, setLoading] = useState(true)
   const roleLogin = useHookstate(globalRole)
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
   const [data, setData] = useState<IEditDataMember>({
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

   async function getAllGroup() {
      try {
         const response = await funGetAllGroup('?active=true')
         if (response.success) {
            setListGorup(response.data);
         } else {
            toast.error(response.message);
         }
      } catch (error) {
         console.error(error)
         toast.error("Gagal mendapatkan grup, coba lagi nanti");
      }
   }

   async function getOneData() {
      try {
         setLoading(true)
         const res = await funGetOneMember(id)
         setData(res.data)
         getAllPosition(res.data?.idGroup)
         setIMG(`https://wibu-storage.wibudev.com/api/files/${res.data.img}`)
         setLoading(false)
      } catch (error) {
         console.error(error)
      } finally {
         setLoading(false)
      }
   }

   async function getAllPosition(val: any) {
      try {
         const res = await funGetAllPosition(
            "?active=true" + "&group=" + `${val}`
         );
         setListPosition(res.data);

      } catch (error) {
         console.error(error)
      }
   }

   async function getAllUserRole() {
      try {
         setListUserRole(valueRoleUser.filter((v) => v.login == roleLogin.get())[0]?.data);
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
         if (_.isEmpty(data)) {
            return
         }
         if (val) {
            const fd = new FormData()
            fd.append("file", imgForm)
            fd.append("data", JSON.stringify(data))

            const res = await funEditMember(id, fd)

            if (res.success) {
               toast.success(res.message)
               router.push(`/member?active=true`)
            } else {
               toast.error(res.message)
            }
         }

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
            pb={100}
         >
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
            {loading ?
               <Skeleton height={150} width={150} radius={"100"} />
               :
               <Indicator offset={20} withBorder inline color={tema.get().bgIcon} position="bottom-end" label={<FaCamera size={20} />} size={40} onClick={() => openRef.current?.()}>
                  <Avatar
                     size="150"
                     radius={"100"}
                     src={img}
                  />
               </Indicator>
            }
            {loading ?
               <>
                  <Skeleton height={40} mt={20} radius={30} />
                  <Skeleton height={40} mt={10} radius={30} />
                  <Skeleton height={40} mt={10} radius={30} />
                  <Skeleton height={40} mt={10} radius={30} />
                  <Skeleton height={40} mt={10} radius={30} />
                  <Skeleton height={40} mt={10} radius={30} />
                  <Skeleton height={40} mt={10} radius={30} />
               </>
               :
               <>

                  {/* <Select
                     placeholder="Pilih Grup" label="Grup" w={"100%"} size="md" required withAsterisk radius={30}
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
                        changeGrup(val)
                        setTouched({ ...touched, idGroup: false })
                     }}
                     value={data?.idGroup}
                     onBlur={() => setTouched({ ...touched, idGroup: true })}
                     error={
                        touched.idGroup && (
                           data.idGroup == "" ? "Grup Tidak Boleh Kosong" : null
                        )
                     }
                  /> */}
                  <Select
                     placeholder="Pilih Jabatan" label="Jabatan" w={"100%"} size="md" required withAsterisk radius={30}
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
                        setData({ ...data, idPosition: val })
                        setTouched({ ...touched, idPosition: false })
                     }}
                     value={(data?.idPosition == "") ? null : data.idPosition}
                     onBlur={() => setTouched({ ...touched, idPosition: true })}
                     error={
                        touched.idPosition && (
                           data.idPosition == "" ? "Jabatan Tidak Boleh Kosong" : null
                        )
                     }
                  />
                  <Select
                     placeholder="Pilih Role" label="User Role" w={"100%"} size="md" required withAsterisk radius={30}
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
                        setData({ ...data, idUserRole: val })
                        setTouched({ ...touched, idUserRole: false })
                     }}
                     value={data?.idUserRole}
                     onBlur={() => setTouched({ ...touched, idUserRole: true })}
                     error={
                        touched.idUserRole && (
                           data.idUserRole == "" ? "Role Tidak Boleh Kosong" : null
                        )
                     }
                  />
                  <TextInput
                     size="md" type="number" radius={30} placeholder="NIK" withAsterisk label="NIK" w={"100%"}
                     styles={{
                        input: {
                           color: tema.get().utama,
                           borderRadius: tema.get().utama,
                           borderColor: tema.get().utama,
                        },
                     }}
                     onChange={(e) => {
                        setData({ ...data, nik: e.target.value })
                        setTouched({ ...touched, nik: false })
                     }}
                     value={data.nik}
                     onBlur={() => setTouched({ ...touched, nik: true })}
                     error={
                        touched.nik && (
                           data.nik === "" ? "NIK Tidak Boleh Kosong" :
                              data.nik.length !== 16 ? "NIK Harus 16 Karakter" : null
                        )
                     }
                  />
                  <TextInput
                     size="md" type="text" radius={30} placeholder="Nama" withAsterisk label="Nama" w={"100%"}
                     styles={{
                        input: {
                           color: tema.get().utama,
                           borderRadius: tema.get().utama,
                           borderColor: tema.get().utama,
                        },
                     }}
                     onChange={(e) => {
                        setData({ ...data, name: e.target.value })
                        setTouched({ ...touched, name: false })
                     }}
                     value={data.name}
                     onBlur={() => setTouched({ ...touched, name: true })}
                     error={
                        touched.name && (
                           data.name == "" ? "Nama Tidak Boleh Kosong" : null
                        )
                     }
                  />
                  <TextInput
                     size="md" type="email" radius={30} placeholder="Email" withAsterisk label="Email" w={"100%"}
                     styles={{
                        input: {
                           color: tema.get().utama,
                           borderRadius: tema.get().utama,
                           borderColor: tema.get().utama,
                        },
                     }}
                     onChange={(e) => {
                        setData({ ...data, email: e.target.value })
                        setTouched({ ...touched, email: false })
                     }}
                     value={data.email}
                     onBlur={() => setTouched({ ...touched, email: true })}
                     error={
                        touched.email && (
                           data.email == "" ? "Email Tidak Boleh Kosong" :
                              !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email) ? "Email tidak valid" : null
                        )
                     }
                  />
                  <TextInput
                     size="md" type="number" radius={30} withAsterisk label="Nomor Telepon" w={"100%"}
                     styles={{
                        input: {
                           color: tema.get().utama,
                           borderRadius: tema.get().utama,
                           borderColor: tema.get().utama,
                        },
                     }}
                     placeholder="8xxx xxxx xxxx"
                     leftSection={<Text>+62</Text>}
                     onChange={(e) => {
                        setData({ ...data, phone: e.target.value })
                        setTouched({ ...touched, phone: false })
                     }}
                     value={data.phone}
                     onBlur={() => setTouched({ ...touched, phone: true })}
                     error={
                        touched.phone && (
                           data.phone == "" ? "Nomor Telepon Tidak Boleh Kosong" :
                              data.phone.length < 10 ? "Nomor Telepon harus 10 digit" : null
                        )
                     }
                  />
                  <Select
                     placeholder="Jenis Kelamin" label="Jenis Kelamin" w={"100%"} size="md" required withAsterisk radius={30}
                     styles={{
                        input: {
                           color: tema.get().utama,
                           borderRadius: tema.get().utama,
                           borderColor: tema.get().utama,
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
                     onChange={(val: any) => {
                        setData({ ...data, gender: val })
                        setTouched({ ...touched, gender: false })
                     }}
                     value={data.gender}
                     onBlur={() => setTouched({ ...touched, gender: true })}
                     error={
                        touched.gender && (
                           data.gender == "" ? "Gender Tidak Boleh Kosong" : null
                        )
                     }
                  />
               </>
            }
         </Stack>
         <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
            maxWidth: rem(550),
            zIndex: 999,
            backgroundColor: `${tema.get().bgUtama}`,
         }}>
            {loading ?
               <Skeleton height={50} radius={30} />
               :
               <Button
                  c={"white"}
                  bg={tema.get().utama}
                  size="md"
                  radius={30}
                  fullWidth
                  onClick={() => {
                     if (
                        data.nik !== "" &&
                        data.name !== "" &&
                        data.email !== "" &&
                        data.phone !== "" &&
                        data.gender !== "" &&
                        data.idGroup !== "" &&
                        data.idPosition !== "" &&
                        data.idUserRole !== ""
                     ) {
                        setModal(true);
                     } else {
                        toast.error("Mohon lengkapi semua form");
                     }
                  }}
               >
                  Simpan
               </Button>
            }
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