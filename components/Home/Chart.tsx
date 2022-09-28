import Typography from '@mui/material/Typography';
import React from 'react';
import { Tooltip, Area, AreaChart, ResponsiveContainer } from 'recharts';
import Grid from '@mui/material/Grid';
import { Matches } from '@prisma/client';

interface ChartProps {
  matchHistory: Matches[];
}

export const Chart = ({ matchHistory }: ChartProps) => {
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
