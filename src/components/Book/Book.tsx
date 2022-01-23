import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { makeStyles, createStyles } from '@material-ui/core';
import React from 'react';
import BookIcon from '../../icons/BookIcon';

const useStyles = makeStyles(() =>
  createStyles({
    book: {
      transform: 'scale(0.5)',
      '&:hover': {
        opacity: '0.5',
        cursor: 'pointer',
      },
    },
  })
);

export default function BookContainer(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const spot = ['650px', '650px'];
  return (
    <>
      <div onClick={onOpen} style={{ position: 'fixed', left: spot[0], top: spot[1], width: '100px', height: '100px' }}>
        <Book />
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <i>Dad Jokes</i> by Jonathan Lafreniere
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>"I'm afraid for the calendar. Its days are numbered."</p>
            <p>"My wife said I should do lunges to stay in shape. That would be a big step forward." </p>
            <p>"Why do fathers take an extra pair of socks when they go golfing?" "In case they get a hole in one!"</p>
            <p>"Singing in the shower is fun until you get soap in your mouth. Then it's a soap opera."</p>
            <p>"What do a tick and the Eiffel Tower have in common?" "They're both Paris sites."</p>
            <p>"What do you call a fish wearing a bowtie?" "Sofishticated."</p>
            <p>"How do you follow Will Smith in the snow?" "You follow the fresh prints." </p>
            <p>"If April showers bring May flowers, what do May flowers bring?" "Pilgrims." </p>
            <p>"I thought the dryer was shrinking my clothes. Turns out it was the refrigerator all along." </p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function Book() {
  const classes = useStyles();
  return (
    <div className={classes.book}>
      <BookIcon />
    </div>
  );
}
