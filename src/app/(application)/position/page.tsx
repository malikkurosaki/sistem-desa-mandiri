import { ViewFilter } from '@/module/_global';
import { ViewListPosition } from '@/module/position';
import React from 'react';

function Page({ searchParams }: { searchParams: { page: string } }) {
  if (searchParams.page == "filter")
    return <ViewFilter  linkFilter='position'/>

  return (
    <ViewListPosition />
  );
}

export default Page;
