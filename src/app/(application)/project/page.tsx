import { ViewFilter } from '@/module/_global';
import { ViewProject } from '@/module/project';
import React from 'react';

function Page({ searchParams }: { searchParams: { cat: string } }) {
  if (searchParams.cat == 'filter')
    return <ViewFilter />
  return (
    <ViewProject />
  );
}

export default Page;
