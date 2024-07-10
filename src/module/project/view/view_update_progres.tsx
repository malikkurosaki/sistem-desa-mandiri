import React from 'react';
import UpdateProgres from '../components/detail_project/update_progres';

export default function ViewUpdateProgres({searchParams}: {searchParams: any}) {
  return (
    <UpdateProgres searchParams={searchParams} />
  );
}

