import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export const History = ({ matchHistory }: any) => {
  return (
    <Grid item xs={12} mb={4} sx={{ overflowY: 'scroll', height: '300px' }}>
      {matchHistory
        ?.slice(0)
        .reverse()
        .map((match: any) => {
          let date = new Date(match.createdAt);
          return (
            <Card sx={{ width: '100%', marginBottom: '5px' }} key={match.id}>
              <CardContent>
                <Grid container justifyContent={'space-between'}>
                  <Grid item>
                    <Typography>
                      Played:{' '}
                      {`${date.getFullYear()}/${
                        date.getMonth() + 1
                      }/${date.getDate()}`}
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
  );
};
