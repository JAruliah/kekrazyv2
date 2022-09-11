import type { NextPage } from 'next';
import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import React from 'react';
import { useSession } from 'next-auth/react';
import { Spinner } from '../components/Common/Spinner';

const Home: NextPage = () => {
  const { data: session , status} = useSession();
  if(status == 'loading'){
    return <Spinner />
  }
  else if(session){
    return(
      <>
        <h3>Hi, {session.user.firstName}!</h3>
      </>
    );
  }else{
    return(
      <>
        <h3>Welcome!</h3>
      </>
    );
  }
}

export default Home
