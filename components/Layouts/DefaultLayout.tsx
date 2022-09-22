import React from 'react';
import { Header } from '../Common/Header';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Box className='content'>
        <Header />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      </Box>
    );
  }
  return (
    <Box className='content'>
      <Header />
      <br></br>
      <Container maxWidth={false}>{children}</Container>
    </Box>
  );
};

export default DefaultLayout;
