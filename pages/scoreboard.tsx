import React from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface scoreboardProps {
  scoreboard: {
    username: string;
    wpm: number;
    accuracy: number;
    totalMatches: number;
  }[];
}

const scoreboard = (props: scoreboardProps) => {
  return (
    <Box>
      <Typography variant='h4' mb={2}>
        Scoreboard
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align='right'>WPM</TableCell>
              <TableCell align='right'>Accuracy</TableCell>
              <TableCell align='right'>Total Matches</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.scoreboard.map((row) => (
              <TableRow
                key={row.username}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.username}
                </TableCell>
                <TableCell align='right'>{Math.round(row.wpm)}</TableCell>
                <TableCell align='right'>{Math.round(row.accuracy)}</TableCell>
                <TableCell align='right'>{row.totalMatches}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
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
