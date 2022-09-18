import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { userAgent } from 'next/server';

interface SettingsProps {
  access: boolean;
}

const settings = (props: SettingsProps) => {
  if (props.access == false) {
    return (
      <Box>
        <Typography variant='h4'>You Don't Have Access To This Page</Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Typography variant='h4'>Settings</Typography>
    </Box>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (session?.user.id == context.params.id) {
    return {
      props: {
        access: true,
      },
    };
  } else {
    return {
      props: {
        access: false,
      },
    };
  }
}

export default settings;
