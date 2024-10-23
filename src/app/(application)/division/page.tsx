import { ViewFilter } from '@/module/_global';
import { CreateReport, NavbarListDivision, TabListDivision } from '@/module/division_new';
import { Box } from '@mantine/core';

function Page({ searchParams }: { searchParams: { page: string } }) {
  if (searchParams.page == "filter")
    return <ViewFilter linkFilter='division' />
  if (searchParams.page == "report")
    return <CreateReport />

  return (
    <Box>
      <NavbarListDivision />
      <TabListDivision />
    </Box>
  );
}

export default Page;
