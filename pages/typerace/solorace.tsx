import React from 'react';
import type { NextPage } from 'next';
import useStore from '../../store';
interface soloraceProps {

}

const solorace: React.FC<soloraceProps> = ({}) => {
  const { raceStarted, setRaceStarted } = useStore();

  if(raceStarted == false){
    return(
      <div className='row justify-content-center'>
        <div className='col-md-6 text-center'>
          <h4>Click on the button when your ready to start</h4>
          <button className='btn btn-primary'>Start</button>
        </div>
      </div>
    )
  }
  else{
    return(
      <div>

      </div>
    );
  }
}
export default solorace