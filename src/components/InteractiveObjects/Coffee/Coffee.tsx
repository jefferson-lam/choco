import { Button } from '@material-ui/core';
import React from 'react';
import useSound from 'use-sound';
import boop from '../../../music/bedtime-coffee.mp3';

export default function Coffee() {
  const [play] = useSound(boop);

  return <button onClick={play}>dwa</button>;
}
