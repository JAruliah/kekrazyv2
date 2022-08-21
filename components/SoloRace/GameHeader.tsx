import React from 'react';
import useStore from '../../store';

interface GameHeaderProps {

}

export const GameHeader: React.FC<GameHeaderProps> = ({}) => {
  const { gameTimer } = useStore();
  return (
    <div className='row justify-content-center mb-4'>
      <div className='col-md-6'>
        <div className='row'>
        <div className='col-md-4'>
            <h5>Time Left: {gameTimer}</h5>
          </div>
          <div className='col-md-4'>
            <h5>WPM:</h5>
          </div>
          <div className='col-md-4'>
            <h5>Accuracy:</h5>
          </div>
        </div>
      </div>
    </div>
  )
}