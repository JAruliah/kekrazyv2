import React from 'react';

interface GameHeaderProps {

}

export const GameHeader: React.FC<GameHeaderProps> = ({}) => {
  return (
    <div className='row justify-content-center mb-4'>
      <div className='col-md-6'>
        <h4>Stats</h4>
      </div>
    </div>
  )
}