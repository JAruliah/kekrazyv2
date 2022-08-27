import React from 'react';
import useStore from '../../store';

interface GameHeaderProps {

}

export const GameHeader: React.FC<GameHeaderProps> = ({}) => {
  const { gameTimer, wpmScore, accuracyScore } = useStore();
  return (
    <div className='row justify-content-center mb-4'>
      <div className='col-md-6'>
        <div className='row'>
          <div className='col-md-4'>
            <h5>Time Left: {gameTimer}</h5>
          </div>
          <div className='col-md-4'>
            <h5>WPM:{wpmScore}</h5>
          </div>
          <div className='col-md-4'>
            <h5>Accuracy:{accuracyScore >= 0 ? accuracyScore:0}%</h5>
          </div>
        </div>
      </div>
    </div>
  )
}