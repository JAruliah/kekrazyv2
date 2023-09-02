import Head from 'next/head';
import React from 'react';
import { useSession } from 'next-auth/react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Stats } from '../components/Home/Stats';
import { Chart } from '../components/Home/Chart';
import { History } from '../components/Home/History';
import { CardContent } from '@mui/material';
import { Card } from '@mui/material';
import { Button } from '@mui/material';
import Link from 'next/link';

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
          <Grid container mb={4}>
            <Typography variant='h6' width='100%' mb={2}>
              Last 50 games
            </Typography>
            <Chart />
          </Grid>
          <Grid container>
            <Typography variant='h6' width='100%' mb={2}>
              Match History
            </Typography>
            <History />
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return (
      <Box>
        <Grid container mb={2}>
          <Grid item>
            <Typography variant='h4'>Welcome!</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} mb={2}>
            <Grid component={Card} style={{ height: '100%' }}>
              <CardContent>
                <Typography variant='h5' mb={1}>
                  KeKrazy!
                </Typography>
                <Typography mb={4}>
                  Test your typing skills in a fun way, all at the same time
                  improving as you play, Compete with others by topping the
                  scoreboard!
                </Typography>
                <Link href='/typerace'>
                  <Button
                    variant='contained'
                    color='success'
                    size='large'
                    sx={{ color: 'white', fontWeight: 'bold' }}
                  >
                    Start a typing race!
                  </Button>
                </Link>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            component={Card}
            sx={{ backgroundColor: '#2f3f59', height: '100%', width: '100%' }}
          >
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography color={'white'}>
                Create an account to track your progress! Save your scores and
                see how you improve over time.
              </Typography>
              <Link href='/auth/Register'>
                <Button
                  variant='contained'
                  color='warning'
                  size='large'
                  sx={{ color: 'white', fontWeight: 'bold' }}
                >
                  Create an account
                </Button>
              </Link>
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    );
  }
};

export default Home;
