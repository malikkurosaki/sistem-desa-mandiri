import React from 'react';
import CreateProject from '../components/create_project';

export default function ViewCreateProject({ searchParams }: { searchParams: any }) {
  return (
    <CreateProject searchParams={searchParams} />
  );
}

