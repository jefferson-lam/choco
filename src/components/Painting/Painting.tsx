import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { makeStyles, createStyles } from '@material-ui/core';
import React from 'react';
import PaintingIcon from '../../icons/PaintingIcon';
import dogMeme from '../../images/helium-dog.jpeg';

const useStyles = makeStyles(() =>
  createStyles({
    painting: {
      transform: 'scale(0.45)',
      '&:hover': {
        opacity: '0.5',
        cursor: 'pointer',
      },
    },
  })
);

export default function PaintingContainer(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const spot = ['970px', '-75px'];
  return (
    <>
      <div onClick={onOpen} style={{ position: 'fixed', left: spot[0], top: spot[1], width: '100px', height: '100px' }}>
        <Painting />
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>An interesting painting...</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={dogMeme}></Image>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function Painting() {
  const classes = useStyles();
  return (
    <div className={classes.painting}>
      <PaintingIcon />
    </div>
  );
}
