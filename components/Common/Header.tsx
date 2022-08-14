import React from 'react';
import { NavBar } from './NavBar';

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    // display user's name and average words per minute
    <header className="text-center">
        <NavBar />
    </header>
  )
}