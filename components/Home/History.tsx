import React, { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Matches } from '@prisma/client';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
interface HistoryProps {
  matchHistory: Matches[];
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const History = ({ matchHistory }: HistoryProps) => {
  const [matchHistoryDupe, setMatchHistoryDupe] = useState(matchHistory);
  const [skip, setSkip] = useState(0);
  return (
    <>
      <Grid item xs={12} mb={4} sx={{ overflowY: 'scroll', height: '300px' }}>
        {matchHistoryDupe
          ?.slice(0)
          .reverse()
          .map((match) => {
            let date = new Date(match.createdAt);
            return (
              <Card sx={{ width: '100%', marginBottom: '5px' }} key={match.id}>
                <CardContent>
                  <Grid container justifyContent={'space-between'}>
                    <Grid item>
                      <Typography>
                        Played:{' '}
                        {`${
                          months[date.getMonth()]
                        }/${date.getDate()}/${date.getFullYear()}
                      `}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>WPM: {match.WPM}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>Accuracy: {match.accuracy}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>Mode: {match.mode}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            );
          })}
      </Grid>
    </>
  );
};
