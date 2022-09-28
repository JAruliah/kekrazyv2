import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

export const Stats = () => {
  const [homeStats, setHomeStats] = useState<{
    userStats: {
      _avg: {
        WPM: number;
        accuracy: number;
      };
      _count: number;
    };
  } | null>(null);

  useEffect(() => {
    const getHomeStats = async () => {
      const response = await axios.get('/api/homeStats');
      setHomeStats(response.data);
    };
    getHomeStats();
  }, []);

  return (
    <Grid container spacing={2} mb={4}>
      <Grid item xs={12} sm={4}>
        <Grid component={Card} style={{ height: '100%' }}>
          <CardContent>
            <Typography>AVG WPM:</Typography>
            {homeStats ? (
              <Typography sx={{ fontWeight: 'bold' }}>
                {Math.round(homeStats.userStats._avg.WPM)}
              </Typography>
            ) : (
              <CircularProgress />
            )}
          </CardContent>
        </Grid>
      </Grid>
      <Grid item xs={6} sm={4}>
        <Grid component={Card} style={{ height: '100%' }}>
          <CardContent>
            <Typography>AVG ACCURACY:</Typography>
            {homeStats ? (
              <Typography sx={{ fontWeight: 'bold' }}>
                {Math.round(homeStats.userStats._avg.accuracy)}
              </Typography>
            ) : (
              <CircularProgress />
            )}
          </CardContent>
        </Grid>
      </Grid>
      <Grid item xs={6} sm={4}>
        <Grid component={Card} style={{ height: '100%' }}>
          <CardContent>
            <Typography>GAMES PLAYED:</Typography>
            {homeStats ? (
              <Typography sx={{ fontWeight: 'bold' }}>
                {homeStats.userStats._count}
              </Typography>
            ) : (
              <CircularProgress />
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Grid>
  );
};
