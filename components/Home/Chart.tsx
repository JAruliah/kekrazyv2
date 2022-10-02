import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Tooltip, Area, AreaChart, ResponsiveContainer } from 'recharts';
import Grid from '@mui/material/Grid';
import { Matches } from '@prisma/client';
import axios from 'axios';

export const Chart = () => {
  const [matchHistory, setMatchHistory] = useState<Matches[]>([]);
  useEffect(() => {
    const getChartData = async () => {
      try {
        const response = await axios.get('/api/homeChartData');
        setMatchHistory(response.data.matches.reverse());
      } catch (error: any) {
        console.log(error);
      }
    };
    getChartData();
  }, []);

  if (matchHistory.length == 0) {
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
