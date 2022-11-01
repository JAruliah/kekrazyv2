import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

const ScoreBoard = () => {
  const [scoreboardData, setScoreBoardData] = useState<
    {
      username: string;
      wpm: number;
      accuracy: number;
      totalMatches: number;
    }[]
  >([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  useEffect(() => {
    const getScoreBoardData = async () => {
      try {
        const response = await axios.get(`/api/scoreboard`);
        setScoreBoardData(response.data);
        setLoaded(true);
      } catch (error: any) {
        console.log(error);
      }
    };
    getScoreBoardData();
  }, []);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    <Box>
      <Typography variant='h4' mb={2}>
        Scoreboard
      </Typography>
      {loaded ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell align='right'>WPM</StyledTableCell>
                <StyledTableCell align='right'>Accuracy</StyledTableCell>
                <StyledTableCell align='right'>Total Matches</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scoreboardData.map((row, i) => (
                <StyledTableRow
                  key={row.username}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell component='th' scope='row'>
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row'>
                    {row.username}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {Math.round(row.wpm)}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {Math.round(row.accuracy)}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.totalMatches}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <CircularProgress sx={{ margin: 'auto' }} />
      )}
    </Box>
  );
};

export default ScoreBoard;
