import React from 'react';
import { Header } from '../Common/Header';
import Script from 'next/script';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Box className="content">
      <Header />
      <br></br>
      <Container maxWidth={false}>{children}</Container>
    </Box>
  );
};
