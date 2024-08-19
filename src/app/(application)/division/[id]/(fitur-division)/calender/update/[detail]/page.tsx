import { UpdateDivisionCalender } from '@/module/calender';
import React from 'react';

function Page({ searchParams }: { searchParams: any }) {
  // if (searchParams.page == "update-ulangi-event")
  //   return <UpdateUlangiEvent />
  // if (searchParams.page == "update-user-calender")
  //   return <UpdateUserDivisionCalender />
  return (
    <UpdateDivisionCalender/>
  );
}

export default Page;
