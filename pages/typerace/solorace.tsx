import React, { useEffect, useState } from 'react';
import useGameStore from '../../store';
import axios from 'axios';
import { Quote } from '../../interfaces/SoloRace';
import { GameView } from '../../components/SoloRace/GameView';
import { START_COUNTDOWN_TIMER, QUOTE_LENGTH } from '../../constantVariables';
interface soloraceProps {
  quote: Quote
}

const solorace: React.FC<soloraceProps> = (props) => {
  const { raceStarted, raceFinished, actions } = useGameStore();
  const [ startCountDown, setStartCountDown ] = useState(START_COUNTDOWN_TIMER);
  const [ countDownStarted, setCountDownStarted ] = useState(false);

  useEffect(() =>{
    actions.setGameState({quote: props.quote});
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
          setStartCountDown(START_COUNTDOWN_TIMER);
          return prevState;
        }
        // keep counting down if not 0
        else{
          return prevState - 1;
        }
      });
      if(count == START_COUNTDOWN_TIMER){
        setCountDownStarted(false);
        actions.setGameState({raceStarted: true, raceFinished: false});
        actions.startGameTimer();
      }
    }, 1000)
  }

  // when playing a new game we must reset values and get a new quote
  const playAgain = async() => {
    const response = await axios.get(`https://api.quotable.io/random?minLength=${QUOTE_LENGTH}`);
    await actions.playAgain(response.data);
    startRace();
  }

  return(
    <>
      <div className='row justify-content-center mb-4'>
        {countDownStarted == true && (
          <div className='col-md-6 text-center'>
            <h4>Starting in: <span>{startCountDown}</span></h4>
          </div>
        )}
        {(countDownStarted == false && raceStarted == false && raceFinished == false) && (
          <div className='col-md-6 text-center'>
            <h4>Click when ready to start</h4>
            <button className='btn btn-primary' onClick={() => startRace()}>Start</button>
          </div>
        )}
      </div>
      {
        countDownStarted == true || raceStarted == true || raceFinished == true ? 
        <GameView />
        : null
      }
      {raceFinished == true ? 
        <div className='row justify-content-center mt-3'>
          <div className='col-md-6 text-center'>
            <button className="btn btn-primary" onClick={() => {playAgain()}}>Play again</button>
          </div>
        </div>
      :null}
    </>
  );
}

// get the props on the server side
export async function getServerSideProps(){
  const response = await axios.get(`https://api.quotable.io/random?minLength=${QUOTE_LENGTH}`);
  return{
    props: {
      quote: response.data
    }
  }
}

export default solorace