import { ViewDetailFeature, ViewHome, ViewNotification, ViewSearch } from '@/module/home';
import React from 'react';

function Page({ searchParams }: { searchParams: { cat: string } }) {
  if (searchParams.cat == "notification")
    return <ViewNotification />
  if (searchParams.cat == "search")
    return <ViewSearch />
  if (searchParams.cat == "fitur")
    return <ViewDetailFeature />
  return (
    <>
      <ViewHome />
    </>
  );
}

export default Page;
