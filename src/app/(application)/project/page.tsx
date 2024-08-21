import { ViewFilter } from '@/module/_global';
import { TabProject, ViewProject } from '@/module/project';
import React from 'react';

function Page({ searchParams }: { searchParams: { cat: string } }) {
  if (searchParams.cat == 'filter')
    return <ViewFilter linkFilter='project' />
  return (
    <TabProject />
  );
}

export default Page;
