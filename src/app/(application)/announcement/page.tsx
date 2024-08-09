import { ViewFilter } from "@/module/_global";
import { ListAnnouncement, NavbarAnnouncement } from "@/module/announcement";
import { Box } from "@mantine/core";

function Page({ searchParams }: { searchParams: { page: string } }) {
   if (searchParams.page == 'filter')
      return <ViewFilter linkFilter="announcement" />
   return (
      <Box>
         <NavbarAnnouncement />
         <ListAnnouncement />
      </Box>
   )
}

export default Page;