import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import EndCallButton from '../Buttons/EndCallButton/EndCallButton';
import Menu from './Menu/Menu';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { Typography, Grid, Hidden } from '@material-ui/core';
import ToggleAudioButton from '../Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from '../Buttons/ToggleVideoButton/ToggleVideoButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: '#000000',
      opacity: 0.5,
      bottom: 0,
      left: 0,
      right: 0,
      height: `${theme.footerHeight}px`,
      position: 'fixed',
      display: 'flex',
      padding: '0 1.43em',
      zIndex: 10,
      '&:hover': {
        opacity: 1.0,
      },
      [theme.breakpoints.down('sm')]: {
        height: `${theme.mobileFooterHeight}px`,
        padding: 0,
      },
    },
    screenShareBanner: {
      position: 'fixed',
      zIndex: 8,
      bottom: `${theme.footerHeight}px`,
      left: 0,
      right: 0,
      height: '104px',
      background: 'rgba(0, 0, 0, 0.5)',
      '& h6': {
        color: 'white',
      },
      '& button': {
        background: 'white',
        color: theme.brand,
        border: `2px solid ${theme.brand}`,
        margin: '0 2em',
        '&:hover': {
          color: '#600101',
          border: `2px solid #600101`,
          background: '#FFE9E7',
        },
      },
    },
    hideMobile: {
      display: 'initial',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  })
);

export default function MenuBar() {
  const classes = useStyles();
  const roomState = useRoomState();
  const isReconnecting = roomState === 'reconnecting';
  const { room } = useVideoContext();

  return (
    <>
      <footer className={classes.container}>
        <Grid container justifyContent="space-around" alignItems="center">
          <Hidden smDown>
            <Grid style={{ flex: 1 }}>
              <Typography variant="body1">{room!.name}</Typography>
            </Grid>
          </Hidden>
          <Grid item>
            <Grid container justifyContent="center">
              <ToggleAudioButton disabled={isReconnecting} />
              <ToggleVideoButton disabled={isReconnecting} />
              <Hidden smDown>
                <Menu />
              </Hidden>
            </Grid>
          </Grid>
          <Hidden smDown>
            <Grid style={{ flex: 1 }}>
              <Grid container justifyContent="flex-end">
                <EndCallButton />
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      </footer>
    </>
  );
}
