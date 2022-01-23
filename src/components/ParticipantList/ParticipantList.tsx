import React from 'react';
import clsx from 'clsx';
import Participant from '../Participant/Participant';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import useMainParticipant from '../../hooks/useMainParticipant/useMainParticipant';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useScreenShareParticipant from '../../hooks/useScreenShareParticipant/useScreenShareParticipant';
import { RemoteParticipant } from 'twilio-video';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      overflowY: 'auto',
      background: 'rgb(79, 83, 85)',
      gridArea: '1 / 2 / 1 / 3',
      zIndex: 5,
      [theme.breakpoints.down('sm')]: {
        gridArea: '2 / 1 / 3 / 3',
        overflowY: 'initial',
        overflowX: 'auto',
        display: 'flex',
      },
    },
    transparentBackground: {
      background: 'transparent',
    },
    scrollContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    innerScrollContainer: {
      width: `calc(${theme.sidebarWidth}px - 3em)`,
      padding: '1.5em 0',
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
        padding: `${theme.sidebarMobilePadding}px`,
        display: 'flex',
      },
    },
  })
);

function ParticipantContainer(props: any) {
  const DEFAULT_SPOT = ['950px', '600px'];
  const POS_1 = ['1000px', '780px'];
  const POS_2 = ['1570px', '450px'];
  const POS_3 = ['200px', '680px'];
  const POSITIONS = [DEFAULT_SPOT, POS_1, POS_2, POS_3];
  let LEFT;
  let TOP;

  if (props.index !== undefined && POSITIONS[props.index] !== undefined) {
    console.log(props.listParticipant);
    console.log(props.index);
    LEFT = POSITIONS[props.index as number][0];
    TOP = POSITIONS[props.index as number][1];
  } else {
    console.log(props);
    return null;
  }

  return (
    <div
      style={{
        // backgroundColor: 'lightblue',
        // display: 'inline-block',
        // textAlign: 'center',
        position: 'fixed',
        height: '10%',
        width: '10%',
        left: LEFT,
        top: TOP,
        transform: 'scale(-1, 1)',
      }}
    >
      <Participant key={props.listParticipant.sid} participant={props.listParticipant} />
    </div>
  );
}

export default function ParticipantList() {
  const classes = useStyles();
  const { room } = useVideoContext();
  const localParticipant = room!.localParticipant;
  let participants = useParticipants();
  const screenShareParticipant = useScreenShareParticipant();
  const mainParticipant = useMainParticipant();
  const isRemoteParticipantScreenSharing = screenShareParticipant && screenShareParticipant !== localParticipant;
  console.log(participants);
  console.log(localParticipant);
  if (participants.filter(e => e.sid === localParticipant.sid).length === 0) {
    participants.push((localParticipant as unknown) as RemoteParticipant);
  }
  // console.log(typeof(mainParticipant.constructor) === LocalParticipant.toString());
  // console.log(participants.includes(localParticipant.sid));
  // if (!participants.includes(localParticpant as RemoteParticipant)) {
  //   participants.push(localParticipant as RemoteParticipant);
  // }
  console.log(mainParticipant.constructor.name);
  console.log(mainParticipant.constructor);
  // participants.push(mainParticipant as RemoteParticipant);
  if (participants.length === 0) {
    console.log('NOPE PLS');
    return null; // Don't render this component if there are no remote participants.
  }
  return (
    <aside
      className={clsx(classes.container, {
        [classes.transparentBackground]: !isRemoteParticipantScreenSharing,
      })}
    >
      <div className={classes.scrollContainer}>
        <div className={classes.innerScrollContainer}>
          {/* <Participant participant={localParticipant} isLocalParticipant={true} /> */}
          {participants.map((participant, participantIndex) => {
            return (
              <ParticipantContainer listParticipant={participant} index={participantIndex} key={participant.sid} />
            );
          })}
        </div>
      </div>
    </aside>
  );
}
