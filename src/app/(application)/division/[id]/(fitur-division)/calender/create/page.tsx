import { CreateCalenderDivisionCaleder, NavbarCreateDivisionCalender } from '@/module/calender';
import { CreateUserDivisionCalender, UlangiEvent, ViewCreateDivisionCalender } from '@/module/division_new';
import React from 'react';

function Page({ searchParams }: { searchParams: any }) {
  if (searchParams.page == "ulangi-event")
    return <UlangiEvent />
  if (searchParams.page == "user-calender")
    return <CreateUserDivisionCalender />

  
  return (
    <CreateCalenderDivisionCaleder />
  );
}

export default Page;
