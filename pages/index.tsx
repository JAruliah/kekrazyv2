import type { NextPage } from 'next';
import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import React from 'react';
import { useSession } from 'next-auth/react';
import { Spinner } from '../components/Common/Spinner';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Home: NextPage = () => {
  const { data: session , status} = useSession();
  if(status == 'loading'){
    return <Spinner />
  }
  else if(session){
    return(
      <Box>
        <Typography variant='h4'>Hi, {session.user.firstName}!</Typography>
      </Box>
    );
  }else{
    return(
      <Box>
        <Typography variant='h4'>Welcome!</Typography>
      </Box>
    );
  }
}

export default Home
