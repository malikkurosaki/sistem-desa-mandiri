import React from 'react';
import FileSave from '../components/file_save';

export default function ViewFileSave({ kategori }: { kategori: string }) {
  return (
    <FileSave kategori={kategori} />
  );
}

