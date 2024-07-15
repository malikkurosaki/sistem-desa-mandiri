import { UpdateUlangiEvent, UpdateUserDivisionCalender, ViewUpdateDivisionCalender } from '@/module/division_new';
import React from 'react';

function Page({ searchParams }: { searchParams: any }) {
  if (searchParams.page == "update-ulangi-event")
    return <UpdateUlangiEvent />
  if (searchParams.page == "update-user-calender")
    return <UpdateUserDivisionCalender />
  return (
    <ViewUpdateDivisionCalender/>
  );
}

export default Page;
