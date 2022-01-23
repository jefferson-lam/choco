import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useDisclosure,
} from '@chakra-ui/react';
import { makeStyles, createStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TimerIcon from '../../icons/TimerIcon';

const useStyles = makeStyles(() =>
  createStyles({
    timer: {
      transform: 'scale(0.5)',
      '&:hover': {
        opacity: '0.5',
        cursor: 'pointer',
      },
    },
  })
);
export default function TimerContainer(props: any) {
  const [minuteParam, setMinuteParam] = useState(25);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);

  const [isStarted, setIsStarted] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const spot = ['1287px', '310px'];

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);

      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          let minutes = displayMessage ? 24 : 4;
          let seconds = 59;

          setSeconds(seconds);
          setMinutes(minutes);
          setDisplayMessage(!displayMessage);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
  }, [seconds]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const handleSubmit = () => {
    setMinutes(minuteParam);
    setIsStarted(true);
    onClose();
  };

  const handleStop = () => {
    setMinutes(30);
    setIsStarted(false);
    onClose();
  };

  return (
    <>
      <div onClick={onOpen} style={{ position: 'fixed', left: spot[0], top: spot[1], width: '100px', height: '100px' }}>
        <Timer />
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pomodoro Timer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isStarted && (
              <>
                <div>
                  Time left: {timerMinutes}:{timerSeconds}
                </div>
                <br />
                <Button onClick={handleStop}>Stop</Button>
              </>
            )}
            {!isStarted && (
              <>
                <FormControl>
                  <FormLabel htmlFor="amount">Study time</FormLabel>
                  <NumberInput onChange={(_s, n) => setMinuteParam(n)} defaultValue={25} min={10} max={60}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <Button width="full" mt={4} onClick={handleSubmit}>
                  Start
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function Timer() {
  const classes = useStyles();
  return (
    <div className={classes.timer}>
      <TimerIcon />
    </div>
  );
}
