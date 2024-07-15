import { ViewDetailEventDivision, ViewDivisionCalender } from '@/module/division_new';
import React from 'react';

function Page({ searchParams }: { searchParams: any }) {
  if (searchParams.page == "detail-event")
    return <ViewDetailEventDivision />
  return (
    <ViewDivisionCalender />
  );
}

export default Page;
