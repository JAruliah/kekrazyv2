import type { NextPage } from 'next';
import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import React from 'react';
import { Spinner } from '../components/Common/Spinner';

const Home: NextPage = () => {

  // if(isLoading){
  //   return <Spinner />
  // }
  // else if(user){
  //   return(
  //     <div>
  //       <h3>Hi, {user.name}</h3>
  //     </div>
  //   )
  // }
    return(
      <div>
        <h3>Welcome!</h3>
      </div>
    )

  // if there is a logged in user welcome them
  // if(user){
  //   return(
  //     <div>
  //       <span>Welcome {user.nickname}</span>
  //     </div>
  //   )
  // }
  // return (
  //   <div className={styles.container}>
  //     <Head>
  //       <title>Home</title>
  //       <meta name="description" content="Generated by create next app" />
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>
  //   </div>
  // )
}

export default Home
