import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core';
import ChatWindow from '../ChatWindow/ChatWindow';
import ParticipantList from '../ParticipantList/ParticipantList';
import MainParticipant from '../MainParticipant/MainParticipant';
import BackgroundSelectionDialog from '../BackgroundSelectionDialog/BackgroundSelectionDialog';
import useChatContext from '../../hooks/useChatContext/useChatContext';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import Participant from '../Participant/Participant';
import Space from '../Space/Space';
import RoomBackground from '../../images/Apartment.jpeg';

const useStyles = makeStyles((theme: Theme) => {
  const totalMobileSidebarHeight = `${theme.sidebarMobileHeight +
    theme.sidebarMobilePadding * 2 +
    theme.participantBorderWidth}px`;
  return {
    container: {
      position: 'relative',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: `1fr ${theme.sidebarWidth}px`,
      gridTemplateRows: '100%',
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: `100%`,
        gridTemplateRows: `calc(100% - ${totalMobileSidebarHeight}) ${totalMobileSidebarHeight}`,
      },
    },
    rightDrawerOpen: { gridTemplateColumns: `1fr ${theme.sidebarWidth}px ${theme.rightDrawerWidth}px` },
  };
});

function MainParticipantContainer() {
  const LEFT_POS = '900px';
  const TOP_POS = '600px';
  return (
    <div
      style={{
        // backgroundColor: 'lightblue',
        // display: 'inline-block',
        // textAlign: 'center',
        position: 'fixed',
        height: '10%',
        width: '10%',
        left: LEFT_POS,
        top: TOP_POS,
      }}
    >
      <MainParticipant />
      {/* Join Spot
      <br />+ */}
    </div>
  );
}

export default function Room() {
  const classes = useStyles();
  const { isChatWindowOpen } = useChatContext();
  const { isBackgroundSelectionOpen } = useVideoContext();

  return (
    <div
      style={{ backgroundImage: `url(${RoomBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
      // className={clsx(classes.container, {
      //   [classes.rightDrawerOpen]: isChatWindowOpen || isBackgroundSelectionOpen,
      // })}
    >
      {/* <MainParticipant /> */}
      {/* <ParticipantList />
      <ChatWindow />
      <BackgroundSelectionDialog /> */}
      {/* <MainParticipantContainer /> */}
      <ParticipantList />
    </div>
  );
}
