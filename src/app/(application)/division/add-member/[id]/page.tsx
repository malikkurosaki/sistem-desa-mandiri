import { CreateAnggotaDivision } from "@/module/division_new";
import { Box } from "@mantine/core";

function Page({ params }: { params: { id: string } }) {
   return (
      <Box>
         <CreateAnggotaDivision />
      </Box>
   )
}

export default Page;