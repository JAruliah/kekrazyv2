import React from 'react';
import axios from 'axios';

const scoreboard = (props: any) => {
  console.log(props);
  return <div>scoreboard</div>;
};

export async function getServerSideProps() {
  const response = await axios.get(`${process.env.API_URL}/api/scoreboard`);
  return {
    props: {
      scoreboard: response.data,
    },
  };
}

export default scoreboard;
