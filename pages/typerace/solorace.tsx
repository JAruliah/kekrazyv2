import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import useStore from '../../store';
import axios from 'axios';
import { Quote } from '../../interfaces/SoloRace';
import { GameView } from '../../components/SoloRace/GameView';
interface soloraceProps {
  quote: Quote
}

const START_COUNTDOWN_TIMER = 5;

const solorace: React.FC<soloraceProps> = (props) => {
  const { raceStarted, setRaceStarted, setQuote } = useStore();
  const [ startCountDown, setStartCountDown ] = useState(START_COUNTDOWN_TIMER);
  const [ countDownStarted, setCountDownStarted ] = useState(false);

  useEffect(() =>{
    setQuote(props.quote);
  },[])

    // start count down interval, start game when countdown is done
  const startRace = () => {
    let count = 0;
    setCountDownStarted(true);
    const startCountDownTimer = setInterval(() => {
      count += 1;
      setStartCountDown((prevState) =>  {
        // if 0 start game and clear interval
        if(prevState == 0){
          clearInterval(startCountDownTimer);
          return prevState;
        }
        // keep counting down if not 0
        else{
          return prevState - 1;
        }
      });
      if(count == START_COUNTDOWN_TIMER){
        setRaceStarted(true);
      }
    }, 1000)
  }

  // if the race hasent started show start button
  if(raceStarted == false){
    return(
      <div className='row justify-content-center'>
        {countDownStarted && (
          <div className='col-md-6 text-center'>
            <h4>Starting in: <span>{startCountDown}</span></h4>
          </div>
        )}
        {countDownStarted == false &&(
          <div className='col-md-6 text-center'>
            <h4>Click when ready to start</h4>
            <button className='btn btn-primary' onClick={() => startRace()}>Start</button>
          </div>
        )}
      </div>
    )
  }
  else{
    return(
      <>
        <GameView />
      </>
    );
  }
}

// get the props on the server side
export async function getServerSideProps(){
  const response = await axios.get('https://api.quotable.io/random?minLength=150');
  return{
    props: {
      quote: response.data
    }
  }
}

export default solorace