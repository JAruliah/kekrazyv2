import React, { useEffect } from 'react';
import useStore from '../../store';
import { GameStats } from './GameStats';

interface GameViewProps {

}

export const GameView: React.FC<GameViewProps> = ({}) => {
  const { quote, raceStarted } = useStore();

  useEffect(() => {
    if(raceStarted == true){
      formatGameQuote();
    }
  }, [raceStarted])

  // we need to split the quote into an array
  const formatGameQuote = () => {
    let quoteArray = quote.content.split(' ');
  }

  return (
    <>
      <GameStats />
      <div className='row justify-content-center mb-4'>
        <div className='col-md-6'>
          {quote.content}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <input className='form-control' />
        </div>
      </div>
    </>
  )
}