import React, { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Matches } from '@prisma/client';
import Button from '@mui/material/Button';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

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

export const History = () => {
  const [matchHistory, setMatchHistory] = useState<Matches[]>([]);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getHistoryData(0);
  }, []);

  const getHistoryData = async (skip: number) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/matchHistory', {
        skip: skip,
      });
      setLoading(false);
      if (response.data.matches.length < 10) {
        setCanLoadMore(false);
        setMatchHistory(response.data.matches);
      } else {
        setMatchHistory([...matchHistory, ...response.data.matches]);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleLoadMore = () => {
    if (canLoadMore) {
      getHistoryData(matchHistory.length);
    }
  };

  if (matchHistory.length == 0) {
    return (
      <Grid item xs={12}>
        <Typography variant='body1'>No matches found.</Typography>
      </Grid>
    );
  }

  return (
    <>
      <Grid item xs={12} sx={{ overflowY: 'scroll', height: '300px' }}>
        {matchHistory?.slice(0).map((match, i) => {
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
      {loading ? (
        <CircularProgress sx={{ margin: 'auto' }} />
      ) : (
        <Button
          color='primary'
          variant='contained'
          fullWidth
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      )}
    </>
  );
};
