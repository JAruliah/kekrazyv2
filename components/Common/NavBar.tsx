import React from 'react';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { Spinner } from './Spinner';
interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { data: session, status } = useSession();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link href={"/"}>
          <a className="navbar-brand">KeKrazy</a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href={"/"}>
                <a className="nav-link" aria-current="page">Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={"/typerace"}>
                <a className="nav-link">Type!</a>
              </Link>
            </li>
          </ul>
          <a className='btn btn-primary' onClick={() => {
            status == 'loading' ? 
              <Spinner />
            : session ? 
                signOut()
              :
                signIn()
          }}>{session? 'Sign out': 'Sign in'}</a>
        </div>
      </div>
    </nav>
  )
}