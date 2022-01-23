import React from 'react';
import clsx from 'clsx';
import Participant from '../Participant/Participant';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import useMainParticipant from '../../hooks/useMainParticipant/useMainParticipant';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';
import useScreenShareParticipant from '../../hooks/useScreenShareParticipant/useScreenShareParticipant';
import { LocalParticipant, RemoteParticipant } from 'twilio-video';

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
  const POS_1 = ['300px', '200px'];
  const POS_2 = ['700px', '100px'];
  const POSITIONS = [POS_1, POS_2];
  let LEFT;
  let TOP;
  if (props.index != undefined && POSITIONS[props.index] != undefined) {
    console.log(POSITIONS[props.index]);
    LEFT = POSITIONS[props.index as number][0];
    TOP = POSITIONS[props.index as number][1];
  } else {
    console.log('Index ' + props.index + 'not defined?');
    LEFT = '930px';
    TOP = '630px';
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
  const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();
  const screenShareParticipant = useScreenShareParticipant();
  const mainParticipant = useMainParticipant();
  const isRemoteParticipantScreenSharing = screenShareParticipant && screenShareParticipant !== localParticipant;
  console.log(participants);
  participants.push(mainParticipant as RemoteParticipant);
  if (participants.length === 0) return null; // Don't render this component if there are no remote participants.
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
            const isSelected = participant === selectedParticipant;
            const hideParticipant =
              participant === mainParticipant && participant !== screenShareParticipant && !isSelected;
            return <ParticipantContainer listParticipant={participant} index={participantIndex} />;
          })}
        </div>
      </div>
    </aside>
  );
}
