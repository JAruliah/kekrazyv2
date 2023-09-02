import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Tooltip, Area, AreaChart, ResponsiveContainer } from 'recharts';
import Grid from '@mui/material/Grid';
import { Matches } from '@prisma/client';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

export const Chart = () => {
  const [matchHistory, setMatchHistory] = useState<Matches[]>([]);
  const [getChartDataLoading, setGetChartDataLoading] = useState(false);
  useEffect(() => {
    const getChartData = async () => {
      try {
        setGetChartDataLoading(true);
        const response = await axios.get('/api/homeChartData');
        setMatchHistory(response.data.matches.reverse());
        setGetChartDataLoading(false);
      } catch (error: any) {
        console.log(error);
      }
    };
    getChartData();
  }, []);

  // if the chart data is loading show a loader
  if (getChartDataLoading == true) {
    return (
      <Grid item xs={12}>
        <CircularProgress />
      </Grid>
    );
  }

  // if there is no match history and the chart data is not loading show a message
  if (matchHistory.length == 0 && getChartDataLoading == false) {
    return (
      <Grid item xs={12}>
        <Typography variant='body1'>No matches found.</Typography>
      </Grid>
    );
  }

  return (
    <Grid item xs={12} mb={4}>
      <ResponsiveContainer width='100%' height={250}>
        <AreaChart data={matchHistory}>
          <Tooltip />
          <Area type='monotone' dataKey='WPM' stroke='#8884d8' fill='#8884d8' />
        </AreaChart>
      </ResponsiveContainer>
    </Grid>
  );
};
