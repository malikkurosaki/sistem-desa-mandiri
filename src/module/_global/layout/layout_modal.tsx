import { Button, Flex, Modal, SimpleGrid, Text } from '@mantine/core';
import React, { useState } from 'react';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { useMediaQuery } from '@mantine/hooks';

export default function LayoutModal({ opened, onClose, description, onYes }: { opened: boolean, onClose: () => void, description: string, onYes: (val: boolean) => void }) {
  const [isValModal, setValModal] = useState(opened)
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [loading, setLoading] = useState(false)
  return (
    <Modal styles={{
      body: {
        margin: 10,
      },
      content: {
        border: `2px solid ${'#828AFC'}`,
        borderRadius: 10
      }
    }} opened={opened} onClose={onClose} withCloseButton={false} centered closeOnClickOutside={false}>
      <Flex justify={"center"} align={"center"} direction={"column"}>
        <BsQuestionCircleFill size={100} color="red" />
        <Text mt={30} ta={"center"} fw={"bold"} fz={18}>{description}</Text>
      </Flex>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 2 }}
        mt={30}
      >
        {isMobile ?
          <>
            <Button loading={loading} fullWidth size="lg" radius={'xl'} bg={'green'} onClick={() => {
              setLoading(true)
              onYes(true)
            }}>YA</Button>
            <Button fullWidth size="lg" radius={'xl'} bg={'#F1C1CF'} c={'#D30B30'} onClick={() => onYes(false)}>TIDAK</Button>
          </>
          :
          <>
            <Button fullWidth size="lg" radius={'xl'} bg={'#F1C1CF'} c={'#D30B30'} onClick={() => onYes(false)}>TIDAK</Button>
            <Button loading={loading} fullWidth size="lg" radius={'xl'} bg={'green'} onClick={() => {
              setLoading(true)
              onYes(true)
            }}>YA</Button>
          </>

        }
      </SimpleGrid>
    </Modal>
  );
}

