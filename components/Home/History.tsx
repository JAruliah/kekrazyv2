import React, { useState, useEffect, useCallback } from 'react';
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const getHistoryData = useCallback(
    async (skip: number) => {
      try {
        setLoading(true);
        setErrorMessage(null);
        const response = await axios.post('/api/matchHistory', {
          skip: skip,
        });
        const matches: Matches[] = Array.isArray(response.data?.matches)
          ? response.data.matches
          : [];
        if (matches.length < 10) {
          setCanLoadMore(false);
        }
        setMatchHistory((prev) => [...prev, ...matches]);
      } catch (error) {
        console.error(error);
        setErrorMessage('Unable to load match history. Please try again later.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    getHistoryData(0);
  }, [getHistoryData]);

  const handleLoadMore = () => {
    if (canLoadMore && !loading) {
      getHistoryData(matchHistory.length);
    }
  };

  if (loading == true && matchHistory.length == 0) {
    return (
      <Grid item xs={12}>
        <CircularProgress />
      </Grid>
    );
  }

  if (matchHistory.length == 0 && loading == false) {
    return (
      <Grid item xs={12}>
        <Typography variant='body1'>
          {errorMessage ? errorMessage : 'No matches found.'}
        </Typography>
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
        canLoadMore && (
          <Button
            color='primary'
            variant='contained'
            fullWidth
            onClick={handleLoadMore}
            disabled={loading}
          >
            Load More
          </Button>
        )
      )}
    </>
  );
};
