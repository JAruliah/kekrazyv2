import Typography from '@mui/material/Typography';
import React from 'react';
import { Tooltip, Area, AreaChart, ResponsiveContainer } from 'recharts';
import Grid from '@mui/material/Grid';

export const Chart = ({ matchHistory }: any) => {
  return (
    <Grid item xs={12} mb={4}>
      <Typography variant='h6' width='100%'>
        Last 50 games
      </Typography>
      <ResponsiveContainer width='100%' height={250}>
        <AreaChart data={matchHistory}>
          <Tooltip />
          <Area type='monotone' dataKey='WPM' stroke='#8884d8' fill='#8884d8' />
        </AreaChart>
      </ResponsiveContainer>
    </Grid>
  );
};
