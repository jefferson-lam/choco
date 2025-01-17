import React from 'react';
import ParticipantTracks from '../ParticipantTracks/ParticipantTracks';
import { Participant as IParticipant } from 'twilio-video';

interface ParticipantProps {
  participant: IParticipant;
  videoOnly?: boolean;
  enableScreenShare?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
  isLocalParticipant?: boolean;
  hideParticipant?: boolean;
}

export default function Participant({
  participant,
  videoOnly,
  enableScreenShare,
  onClick,
  isSelected,
  isLocalParticipant,
  hideParticipant,
}: ParticipantProps) {
  return (
    <ParticipantTracks
      participant={participant}
      videoOnly={videoOnly}
      enableScreenShare={enableScreenShare}
      isLocalParticipant={isLocalParticipant}
    />
  );
}
