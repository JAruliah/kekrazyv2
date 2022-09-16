import type { NextPage } from 'next';
import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import React from 'react';
import { useSession } from 'next-auth/react';
import { Spinner } from '../components/Common/Spinner';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  if (status == 'loading') {
    return <Spinner />;
  } else if (session) {
    return (
      <Grid container>
        <Grid item>
          <Typography variant="h4">Hi, {session.user.firstName}!</Typography>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container>
        <Grid item>
          <Typography variant="h4">Welcome!</Typography>
        </Grid>
      </Grid>
    );
  }
};

export default Home;
