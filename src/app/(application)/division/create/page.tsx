import { CreateAdminDivision, CreateUsers, ViewCreateDivision } from '@/module/division_new';
import React from 'react';

function Page({ searchParams }: { searchParams: { page: string } }) {
  if (searchParams.page == "anggota")
    return <CreateUsers grup=''/>
  // if (searchParams.page == "pilih-admin")
  //   return <CreateAdminDivision />
  return (
    <ViewCreateDivision/>
  );
}

export default Page;
