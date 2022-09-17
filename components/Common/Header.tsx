import React from 'react';
import { NavBar } from './NavBar';

export const Header: React.FC = () => {
  return (
    // display user's name and average words per minute
    <header>
      <NavBar />
    </header>
  );
};
