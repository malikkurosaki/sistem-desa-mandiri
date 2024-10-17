import { ViewFilter } from "@/module/_global";
import { ListMember, NavbarListMember } from "@/module/user/member";
import { Box } from "@mantine/core";

function Page({ searchParams }: { searchParams: { page: string } }) {
  if (searchParams.page == "filter") return <ViewFilter linkFilter="member" />;

  return (
    <Box>
      <NavbarListMember />
      <ListMember />
    </Box>
  );
}

export default Page;
