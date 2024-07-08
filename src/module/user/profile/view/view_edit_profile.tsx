
import { isModal, WARNA } from "@/module/_global";
import { Box, Button, Modal, Stack, TextInput } from "@mantine/core";
import HeaderEditProfile from "../component/ui/header_edit_profile";
import { HiUser } from "react-icons/hi2";
import { useHookstate } from "@hookstate/core";
import EditProfile from "../component/edit_profile";

export default function ViewEditProfile() {
   return (
      <EditProfile/>
   )
}