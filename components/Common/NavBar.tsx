import React from 'react';
import { signIn } from 'next-auth/react';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <a className="navbar-brand" href="#">KeKrazy</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/typerace">Type!</a>
            </li>
          </ul>
          <a className='btn btn-primary' onClick={() => signIn()}>Login</a>
        </div>
      </div>
    </nav>
  )
}