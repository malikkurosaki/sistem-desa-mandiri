import { EditDivision } from "@/module/division_new"
import { Box } from "@mantine/core"

function Page({ params }: { params: { id: string } }) {
   return (
      <Box>
         <EditDivision />
      </Box>
   )
}

export default Page