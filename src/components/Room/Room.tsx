import React from 'react';
import ParticipantList from '../ParticipantList/ParticipantList';
import MainParticipant from '../MainParticipant/MainParticipant';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import Participant from '../Participant/Participant';
import Space from '../Space/Space';
import Timer from '../Timer/Timer';
import TimerIcon from '../../icons/TimerIcon';
import RoomBackground from '../../images/Apartment.jpeg';
import TimerContainer from '../Timer/Timer';

export default function Room() {
  return (
    <div>
      <TimerContainer />
      <ParticipantList />
    </div>
  );
}
