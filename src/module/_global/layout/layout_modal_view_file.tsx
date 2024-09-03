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
            maxWidth: 550,
         }
      }} opened={opened} onClose={onClose} withCloseButton={true} centered closeOnClickOutside={false} fullScreen>

         {
            extension === 'pdf' ? <PdfToImage md={filePdf} /> :
               <Image
                  radius="md"
                  style={{
                     maxWidth: '100%',
                     maxHeight: '100%',
                  }}
                  fit="contain"
                  src={`/api/file/img?cat=${fitur}&file=${file}&jenis=file`}
               />
         }
      </Modal>
   );
}

