import React from 'react';
import Link from 'next/link';

interface index {

}

const index: React.FC<index> = ({}) => {
  return (
    <>
      <div className='row my-4'>
        <div className='col-12'>
          <h3>Choose a race</h3>
          <span>
            Ready to test your typing speed? Choose a race below
          </span>
        </div>
      </div>
      <div className='row'>
        <div className='col-6'>
          <div className="card">
            {/* <img src="..." className="card-img-top" alt="..." /> */}
            <div className="card-body">
              <h5 className="card-title">Solo Test!</h5>
              <p className="card-text">Practice your typing speed on your own</p>
              <Link href={'/typerace/solorace'}>
                <a className="btn btn-primary">Play</a>
              </Link>
            </div>
          </div>
        </div>
        <div className='col-6'>
          <div className="card bg-secondary">
            {/* <img src="..." className="card-img-top" alt="..." /> */}
            <div className="card-body">
              <h5 className="card-title">Online Race! - Coming Soon</h5>
              <p className="card-text">Test your typing speed against other players!</p>
              <Link href={'#'}>
                <a className="btn btn-primary disabled">Play</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default index;