import { ViewFilter } from '@/module/_global';
import { CreateReport, ListDivision } from '@/module/division_new';
import React from 'react';

function Page({ searchParams }: { searchParams: { page: string } }) {
  if (searchParams.page == "filter")
    return <ViewFilter  linkFilter='division'/>
  if (searchParams.page == "report")
    return <CreateReport />
  return (
    <ListDivision/>
  );
}

export default Page;
