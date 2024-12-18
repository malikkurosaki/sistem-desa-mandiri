'use client'
import { globalRole, TEMA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { funGetAllGroup, IDataGroup } from "@/module/group";
import { funGetAllPosition } from "@/module/position/lib/api_position";
import { useHookstate } from "@hookstate/core";
import { Avatar, Box, Button, Indicator, rem, Select, Skeleton, Stack, Text, TextInput } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa6";
import { valueRoleUser } from "../../lib/val_user";
import { funEditMember, funGetOneMember } from "../lib/api_member";
import { IDataPositionMember, IDataROleMember, IEditDataMember } from "../lib/type_member";


export default function EditMember({ id }: { id: string }) {
   const [isModal, setModal] = useState(false)
   const [loadingKonfirmasi, setLoadingKonfirmasi] = useState(false)
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


   useShallowEffect(() => {
      getAllGroup()
      getOneData()
      getAllUserRole()
   }, [])


   async function onSubmit(val: boolean) {
      try {
         setLoadingKonfirmasi(true)
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
      } catch (error) {
         toast.error('Error');
      } finally {
         setLoadingKonfirmasi(false)
         setModal(false)
      }
   }

   function onCheck() {
      if (Object.values(touched).some((v) => v == true))
         return false
      setModal(true)
   }

   function onValidation(kategori: string, val: string) {
      if (kategori == 'nik') {
         setData({ ...data, nik: val })
         if (val === "" || val.length !== 16) {
            setTouched({ ...touched, nik: true })
         } else {
            setTouched({ ...touched, nik: false })
         }
      } else if (kategori == 'name') {
         setData({ ...data, name: val })
         if (val === "") {
            setTouched({ ...touched, name: true })
         } else {
            setTouched({ ...touched, name: false })
         }
      } else if (kategori == 'phone') {
         setData({ ...data, phone: val })
         if (val == "" || !(val.length >= 10 && val.length <= 15)) {
            setTouched({ ...touched, phone: true })
         } else {
            setTouched({ ...touched, phone: false })
         }
      } else if (kategori == 'email') {
         setData({ ...data, email: val })
         if (val == "" || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) {
            setTouched({ ...touched, email: true })
         } else {
            setTouched({ ...touched, email: false })
         }
      } else if (kategori == 'gender') {
         setData({ ...data, gender: val })
         if (val == "" || String(val) == "null") {
            setTouched({ ...touched, gender: true })
         } else {
            setTouched({ ...touched, gender: false })
         }
      } else if (kategori == 'idPosition') {
         setData({ ...data, idPosition: val })
         if (val === "" || String(val) == "null") {
            setTouched({ ...touched, idPosition: true })
         } else {
            setTouched({ ...touched, idPosition: false })
         }
      } else if (kategori == 'idUserRole') {
         setData({ ...data, idUserRole: val })
         if (val === "" || String(val) == "null") {
            setTouched({ ...touched, idUserRole: true })
         } else {
            setTouched({ ...touched, idUserRole: false })
         }
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
               <Indicator offset={20} withBorder inline color={tema.get().bgFiturHome} position="bottom-end" label={<FaCamera size={20} />} size={40} onClick={() => openRef.current?.()}>
                  <Avatar
                     size="150"
                     radius={"100"}
                     src={img}
                     style={{
                        border: `1px solid ${"#C1BFBFFF"}`
                     }}
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
                     onChange={(val: any) => { onValidation('idPosition', val) }}
                     value={(data?.idPosition == "") ? null : data.idPosition}
                     error={
                        touched.idPosition && (
                           data.idPosition == "" || String(data.idPosition) == "null" ? "Jabatan Tidak Boleh Kosong" : null
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
                     onChange={(val: any) => { onValidation('idUserRole', val) }}
                     value={data?.idUserRole}
                     error={
                        touched.idUserRole && (
                           data.idUserRole == "" || String(data.idUserRole) == "null" ? "Role Tidak Boleh Kosong" : null
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
                     onChange={(e) => { onValidation('nik', e.target.value) }}
                     value={data.nik}
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
                     onChange={(e) => { onValidation('name', e.target.value) }}
                     value={data.name}
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
                     onChange={(e) => { onValidation('email', e.target.value) }}
                     value={data.email}
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
                     onChange={(e) => { onValidation('phone', e.target.value); }}
                     value={data.phone}
                     error={
                        touched.phone && (
                           data.phone == "" ? "Nomor Telepon Tidak Boleh Kosong" :
                              data.phone.length < 9 ? "Nomor Telepon Tidak Valid" : null
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
                     onChange={(val: any) => { onValidation('gender', val) }}
                     value={data.gender}
                     error={
                        touched.gender && (
                           data.gender == "" || String(data.gender) == "null" ? "Jenis Kelamin Tidak Boleh Kosong" : null
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
                  onClick={() => { onCheck() }}
               >
                  Simpan
               </Button>
            }
         </Box>
         <LayoutModal loading={loadingKonfirmasi} opened={isModal} onClose={() => setModal(false)}
            description="Apakah Anda yakin ingin mengubah data?"
            onYes={(val) => {
               if (val) {
                  onSubmit(val)
               } else {
                  setModal(false)
               }
            }
            } />
      </Box>
   )
}