import { NavbarDivisionCalender } from '@/module/calender';
import { ViewDetailEventDivision } from '@/module/division_new';
import React from 'react';

function Page({ searchParams }: { searchParams: any }) {
  if (searchParams.page == "detail-event")
    return <ViewDetailEventDivision />
  return (
    <NavbarDivisionCalender />
  );
}

export default Page;
