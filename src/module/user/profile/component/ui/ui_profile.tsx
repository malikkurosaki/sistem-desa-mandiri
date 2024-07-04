'use client'
import { Group, Text } from "@mantine/core";
import { useRouter } from "next/navigation";


export function InfoTitleProfile() {
   const router = useRouter()
   return (
      <Group justify="space-between" grow py={5}>
         <Text fw={'bold'} fz={20}>Informasi</Text>
         <Text ta={"right"} c={"blue"} onClick={() => router.push('/profile/edit')}>Edit</Text>
      </Group>
   )
}