import Head from 'next/head';
import React from 'react';
import { useSession } from 'next-auth/react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Stats } from '../components/Home/Stats';

const Home = () => {
  const { data: session, status } = useSession();
  if (status == 'loading') {
    return <CircularProgress />;
  } else if (session) {
    return (
      <Box>
        <Grid container>
          <Grid item xs={12} md={6} mb={2}>
            <Typography variant='h4'>Hi, {session.user?.firstName}!</Typography>
          </Grid>
          <Grid container>
            <Stats />
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return (
      <Grid container>
        <Grid item>
          <Typography variant='h4'>Welcome!</Typography>
        </Grid>
      </Grid>
    );
  }
};

export default Home;
