import React from 'react';
import ParticipantList from '../ParticipantList/ParticipantList';
import RoomBackground from '../../images/Apartment.jpeg';

export default function Room() {
  return (
    <div style={{ backgroundImage: `url(${RoomBackground})` }}>
      <ParticipantList />
    </div>
  );
}
