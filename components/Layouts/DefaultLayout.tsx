import React, { useEffect, useState } from 'react';
import { Header } from '../Common/Header';
import Script from 'next/script';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';
import useGeneralStore from '../../stores/GeneralStore';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  // get settings
  useEffect(() => {
    const getTheme = async () => {
      const theme = await axios.get('/api/getTheme');
      // console.log(theme.data.theme);
      useGeneralStore.setState({
        themeMode: theme.data.theme,
      });
      setLoading(false);
    };
    if (status == 'authenticated') {
      getTheme();
    }
    setLoading(false);
  }, [status]);

  if (loading) {
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
