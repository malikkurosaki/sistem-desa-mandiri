import { NavbarDetailDivisionTask, ProgressDetailTask, ListTugasDetailTask, ListFileDetailTask, ListAnggotaDetailTask } from "@/module/task"
import { Box } from "@mantine/core"

function Page() {
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

export default Page