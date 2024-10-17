import { InformationDivision } from "@/module/division_new";
import { Box } from "@mantine/core";

function Page({ params }: { params: { id: string } }) {
   return (
      <Box>
         <InformationDivision />
      </Box>
   )
}

export default Page;