import React from 'react';

interface GameStatsProps {

}

export const GameStats: React.FC<GameStatsProps> = ({}) => {
  return (
    <div className='row justify-content-center mb-4'>
      <div className='col-md-6'>
        <h4>Stats</h4>
      </div>
    </div>
  )
}