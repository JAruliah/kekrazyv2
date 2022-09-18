import type { NextPage } from 'next';
import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import React from 'react';
import { useSession } from 'next-auth/react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status == 'loading') {
    return <CircularProgress />;
  } else if (session) {
    return (
      <Box>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant='h4'>Hi, {session.user.firstName}!</Typography>
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
