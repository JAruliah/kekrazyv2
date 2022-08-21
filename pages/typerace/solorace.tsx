import React, { useEffect, useState } from 'react';
import useStore from '../../store';
import axios from 'axios';
import { Quote } from '../../interfaces/SoloRace';
import { GameView } from '../../components/SoloRace/GameView';
interface soloraceProps {
  quote: Quote
}

const START_COUNTDOWN_TIMER = 5;
const GAME_TIMER = 120;

const solorace: React.FC<soloraceProps> = (props) => {
  const { raceStarted, raceFinished, setGameState } = useStore();
  const [ startCountDown, setStartCountDown ] = useState(START_COUNTDOWN_TIMER);
  const [ countDownStarted, setCountDownStarted ] = useState(false);

  useEffect(() =>{
    setGameState({quote: props.quote});
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
        setGameState({raceStarted: true, raceFinished: false});
      }
    }, 1000)
  }
  return(
    <>
        <div className='row justify-content-center'>
          {countDownStarted == true && (
              <div className='col-md-6 text-center'>
                <h4>Starting in: <span>{startCountDown}</span></h4>
              </div>
            )
          }
          {(countDownStarted == false && raceStarted == false) &&(
            <div className='col-md-6 text-center'>
              <h4>Click when ready to start</h4>
              <button className='btn btn-primary' onClick={() => startRace()}>Start</button>
            </div>
          )}
        </div>
        {
          countDownStarted == true || raceStarted == true ? 
          <GameView />
          : null
        }
    </>
  );
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