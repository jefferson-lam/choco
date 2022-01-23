import React, { useState, useEffect, FormEvent } from 'react';
import DeviceSelectionScreen from './DeviceSelectionScreen/DeviceSelectionScreen';
import IntroContainer from '../IntroContainer/IntroContainer';
import MediaErrorSnackbar from './MediaErrorSnackbar/MediaErrorSnackbar';
import RoomNameScreen from './RoomNameScreen/RoomNameScreen';
import { useAppState } from '../../state';
import { useParams } from 'react-router-dom';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { Box, Center, SimpleGrid, Stack } from '@chakra-ui/react';
import CatIcon from '../../icons/CatIcon';

export enum Steps {
  roomNameStep,
  deviceSelectionStep,
}

export default function PreJoinScreens() {
  const { user } = useAppState();
  const { getAudioAndVideoTracks } = useVideoContext();
  const { URLRoomName } = useParams();
  const [step, setStep] = useState(Steps.roomNameStep);

  const [name, setName] = useState<string>(user?.displayName || '');
  const [roomName, setRoomName] = useState<string>('');

  const [mediaError, setMediaError] = useState<Error>();

  useEffect(() => {
    if (URLRoomName) {
      setRoomName(URLRoomName);
      if (user?.displayName) {
        setStep(Steps.deviceSelectionStep);
      }
    }
  }, [user, URLRoomName]);

  useEffect(() => {
    if (step === Steps.deviceSelectionStep && !mediaError) {
      getAudioAndVideoTracks().catch(error => {
        console.log('Error acquiring local media:');
        console.dir(error);
        setMediaError(error);
      });
    }
  }, [getAudioAndVideoTracks, step, mediaError]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // If this app is deployed as a twilio function, don't change the URL because routing isn't supported.
    if (!window.location.origin.includes('twil.io')) {
      window.history.replaceState(null, '', window.encodeURI(`/room/${roomName}${window.location.search || ''}`));
    }
    setStep(Steps.deviceSelectionStep);
  };

  return (
    <>
      {step === Steps.roomNameStep && (
        <SimpleGrid columns={2} spacing={10}>
          <Center>
            <Center>
              <MediaErrorSnackbar error={mediaError} />
              {step === Steps.roomNameStep && (
                <>
                  <Stack>
                    <Center>
                      {' '}
                      <h1>choco.</h1>
                    </Center>
                    <Center>
                      {' '}
                      <h4>interactive collaboration made fun</h4>
                    </Center>
                    <RoomNameScreen
                      name={name}
                      roomName={roomName}
                      setName={setName}
                      setRoomName={setRoomName}
                      handleSubmit={handleSubmit}
                    />
                  </Stack>
                </>
              )}
            </Center>
          </Center>
          <Center>
            <CatIcon></CatIcon>
          </Center>
        </SimpleGrid>
      )}
      <Center>
        {step === Steps.deviceSelectionStep && (
          <DeviceSelectionScreen name={name} roomName={roomName} setStep={setStep} />
        )}
      </Center>
    </>
  );
}
