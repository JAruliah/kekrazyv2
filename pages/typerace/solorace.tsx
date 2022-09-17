import React, { useEffect, useState } from 'react';
import useGameStore from '../../stores/GameStore';
import axios from 'axios';
import { Quote } from '../../interfaces/SoloRace';
import { GameView } from '../../components/SoloRace/GameView';
import { START_COUNTDOWN_TIMER, QUOTE_LENGTH } from '../../constantVariables';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useSession } from 'next-auth/react';
interface soloraceProps {
  quote: Quote;
}

const solorace: React.FC<soloraceProps> = (props) => {
  const { data: session } = useSession();
  const { raceStarted, raceFinished, actions } = useGameStore();
  const [startCountDown, setStartCountDown] = useState(START_COUNTDOWN_TIMER);
  const [countDownStarted, setCountDownStarted] = useState(false);

  useEffect(() => {
    actions.setGameState({ quote: props.quote });
  }, []);

  // start count down interval, start game when countdown is done
  const startRace = () => {
    let count = 0;
    setCountDownStarted(true);
    const startCountDownTimer = setInterval(() => {
      count += 1;
      setStartCountDown((prevState) => {
        // if 0 clear interval
        if (prevState == 0) {
          clearInterval(startCountDownTimer);
          return START_COUNTDOWN_TIMER;
        }
        // keep counting down if not 0
        else {
          return prevState - 1;
        }
      });
      if (count == START_COUNTDOWN_TIMER) {
        setCountDownStarted(false);
        actions.setGameState({ raceStarted: true, raceFinished: false });
        actions.startGameTimer(session);
      }
    }, 1000);
  };

  // when playing a new game we must reset values and get a new quote
  const playAgain = async () => {
    const response = await axios.get(
      `https://api.quotable.io/random?maxLength=${QUOTE_LENGTH}`
    );
    await actions.playAgain(response.data);
    startRace();
  };

  return (
    <>
      {countDownStarted == true && (
        <Grid container justifyContent={'center'} mb={4}>
          <Grid
            item
            md={6}
            style={{ borderBottom: '1px solid #a1a1a1', padding: '5px' }}
          >
            <Typography variant='h5' textAlign={'center'}>
              Starting in: <span>{startCountDown}</span>
            </Typography>
          </Grid>
        </Grid>
      )}
      {countDownStarted == false &&
        raceStarted == false &&
        raceFinished == false && (
          <>
            <Grid container justifyContent={'center'} mb={2}>
              <Grid item>
                <Typography variant='h5'>Click when ready to start</Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent={'center'}>
              <Grid item>
                <Button
                  variant='contained'
                  onClick={() => startRace()}
                  color='secondary'
                >
                  Start
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      {countDownStarted || raceStarted || raceFinished ? <GameView /> : null}
      {raceFinished ? (
        <Grid container justifyContent={'center'} mt={2}>
          <Grid item>
            <Button
              variant='contained'
              onClick={() => {
                playAgain();
              }}
              color='secondary'
            >
              Play again
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

// get the props on the server side
export async function getServerSideProps() {
  const response = await axios.get(
    `https://api.quotable.io/random?minLength=${QUOTE_LENGTH}`
  );
  return {
    props: {
      quote: response.data,
    },
  };
}

export default solorace;
