import React from 'react';
import useGameStore from '../../stores/GameStore';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
interface GameHeaderProps {}

export const GameHeader: React.FC<GameHeaderProps> = ({}) => {
  const { gameTimer, wpmScore, accuracyScore } = useGameStore();
  return (
    <Grid container mb={4} justifyContent={'center'}>
      <Grid
        item
        xs={12}
        md={6}
        style={{ borderBottom: '1px solid #a1a1a1', padding: '5px' }}
      >
        <Grid container justifyContent={'space-between'}>
          <Grid item xs={12} md={4}>
            <Typography
              style={{ fontSize: '22px', width: 'fit-content', margin: 'auto' }}
              variant="h5"
            >
              Time Left: {gameTimer}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              style={{ fontSize: '22px', width: 'fit-content', margin: 'auto' }}
              variant="h5"
            >
              WPM: {wpmScore}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              style={{ fontSize: '22px', width: 'fit-content', margin: 'auto' }}
              variant="h5"
            >
              Accuracy: {accuracyScore >= 0 ? accuracyScore : 0}%
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
