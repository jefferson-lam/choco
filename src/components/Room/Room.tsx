import React from 'react';
import ParticipantList from '../ParticipantList/ParticipantList';
import TimerContainer from '../Timer/Timer';
import BookContainer from '../Book/Book';
import PaintingContainer from '../Painting/Painting';

export default function Room() {
  return (
    <div>
      <PaintingContainer />
      <BookContainer />
      <TimerContainer />
      <ParticipantList />
    </div>
  );
}
