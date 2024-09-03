'use client'
import { Image, Modal } from '@mantine/core';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
const PdfToImage = dynamic(() => import('./../components/pdf_viewer').then((mod) => mod.default), { ssr: false });

export default function LayoutModal({ opened, onClose, extension, fitur, file }: { opened: boolean, onClose: () => void, extension: string, fitur: string, file: string }) {
   const [isValModal, setValModal] = useState(opened)
   const filePdf = '/file/' + fitur + '/' + file
   return (
      <Modal styles={{
         body: {
            margin: 10,
         },
         content: {
            border: `2px solid ${'#828AFC'}`,
            borderRadius: 10
         }
      }} opened={opened} onClose={onClose} withCloseButton={true} centered closeOnClickOutside={false}>

         {
            extension === 'pdf' ? <PdfToImage md={filePdf} /> :
               <Image
                  radius="md"
                  h={200}
                  w="auto"
                  fit="contain"
                  src={`/api/file/img?cat=${fitur}&file=${file}&jenis=file`}
               />
         }
      </Modal>
   );
}

