import { useHookstate } from '@hookstate/core';
import { Box, Button, Flex, Modal, Text } from '@mantine/core';
import React, { useState } from 'react';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { isModal } from '../val/isModal';

export default function LayoutModal({ opened, onClose, description, onYes }: { opened: boolean, onClose: () => void, description: string, onYes: (val: boolean) => void }) {
  const openModal = useHookstate(isModal)
  const [isValModal, setValModal] = useState(opened)
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
        <Box mt={30} w={'100%'}>
          <Button mb={20} fullWidth size="lg" radius={'xl'} bg={'#4754F0'} onClick={() => onYes(true)}>YA</Button>
          <Button fullWidth size="lg" radius={'xl'} bg={'#DCE1FE'} c={'#4754F0'} onClick={() => onYes(false)}>TIDAK</Button>
        </Box>
      </Flex>
    </Modal>
  );
}

