import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

const SignIn = ({}) => {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const validateSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    // if there are inputs then attemp the sign in
    try {
      signIn('credentials', {
        username: loginForm.username,
        password: loginForm.password,
        redirect: false,
      }).then((res) => {
        if (res?.ok == false) {
          setErrorMessage('Please ensure your credentials are correct');
        } else {
          router.push('/');
        }
      });
      // setErrorMessage('please ensure your credentials are correct');
    } catch (err) {
      setErrorMessage('oops something went wrong');
    }
  };
  return (
    <Box>
      <Grid container justifyContent={'center'} mb={2}>
        <Typography variant='h4'>Sign in</Typography>
      </Grid>
      {errorMessage.length > 0 ? (
        <Grid container mb={2} justifyContent={'center'}>
          <Grid item xs={12} md={6}>
            <Alert severity='warning'>{errorMessage}</Alert>
          </Grid>
        </Grid>
      ) : null}
      <form onSubmit={(e) => validateSignin(e)}>
        <Grid container justifyContent={'center'} mb={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Username'
              name='username'
              type='text'
              value={loginForm.username}
              onChange={(e) =>
                setLoginForm({ ...loginForm, username: e.target.value })
              }
              required={true}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent={'center'} mb={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Password'
              name='password'
              type='password'
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              required={true}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent={'center'} mb={2}>
          <Link href={'/auth/Register'}>
            <a>
              <Typography variant='body1'>No account? Register here</Typography>
            </a>
          </Link>
        </Grid>
        <Grid container justifyContent={'center'}>
          <Button type='submit' variant='contained' color='secondary'>
            Sign in
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default SignIn;
