
import { ListBanner, NavbarBanner } from "@/module/banner";
import { Box } from "@mantine/core";

export default function Page() {
   return (
      <Box>
         <NavbarBanner />
         <ListBanner />
    
      </Box>
   );
}