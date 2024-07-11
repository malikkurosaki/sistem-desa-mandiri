import { Box } from "@mantine/core";
import NavbarDetailDivisionTask from "../component/navbar_detail_division_task";
import ProgressDetailTask from "../component/detail_progress_task";
import ListTugasDetailTask from "../component/detail_list_tugas_task";
import ListFileDetailTask from "../component/detail_list_file_task";
import ListAnggotaDetailTask from "../component/detail_list_anggota_task";

export default function ViewDetailDivisionTask() {
   return (
      <Box>
         <NavbarDetailDivisionTask />
         <Box p={20}>
            <ProgressDetailTask />
            <ListTugasDetailTask />
            <ListFileDetailTask />
            <ListAnggotaDetailTask />
         </Box>
      </Box>
   )
}