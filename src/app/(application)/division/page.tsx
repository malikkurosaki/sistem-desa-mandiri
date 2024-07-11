
import { ViewFilter } from '@/module/_global';
import { ViewCreateReport, ViewDivision } from '@/module/division_new';
import React from 'react';

function Page({ searchParams }: { searchParams: { page: string } }) {
  if (searchParams.page == "filter")
    return <ViewFilter />
  if (searchParams.page == "report")
    return <ViewCreateReport />
  return (
    <ViewDivision/>
  );
}

export default Page;
