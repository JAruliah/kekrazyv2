import React, { useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

const register = () => {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check if passwords match
    if (registerForm.password == registerForm.confirmPassword) {
      try {
        setLoading(true);
        const response = await axios.post('/api/auth/register', registerForm);
        if (response.data.error == false) {
          setErrorMessage('');
          // sign user in if the register was success and redirect to home page
          await signIn('credentials', {
            username: registerForm.username,
            password: registerForm.password,
            redirect: false,
          });
          router.push('/');
        } else {
          setErrorMessage('oops something went wrong');
        }
        setLoading(false);
      } catch (err: any) {
        setErrorMessage(err.response.data.message);
        setLoading(false);
      }
    } else {
      setErrorMessage("Passwords Don't match");
    }
  };

  return (
    <Box>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container justifyContent={'center'} mb={2}>
          <Typography variant="h4">Register</Typography>
        </Grid>
        {errorMessage.length > 0 ? (
          <Grid container justifyContent={'center'} mb={2}>
            <Grid item xs={12} md={6}>
              <Alert severity="warning">{errorMessage}</Alert>
            </Grid>
          </Grid>
        ) : null}
        <Grid container justifyContent={'center'} mb={2}>
          <Grid item md={6}>
            <TextField
              label="First Name"
              type="text"
              fullWidth
              value={registerForm.firstName}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, firstName: e.target.value })
              }
              required={true}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent={'center'} mb={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Last Name"
              type="text"
              fullWidth
              value={registerForm.lastName}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, lastName: e.target.value })
              }
              required={true}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent={'center'} mb={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={registerForm.email}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, email: e.target.value })
              }
              required={true}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent={'center'} mb={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Username"
              type="text"
              fullWidth
              value={registerForm.username}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, username: e.target.value })
              }
              required={true}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent={'center'} mb={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={registerForm.password}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, password: e.target.value })
              }
              required={true}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent={'center'} mb={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={registerForm.confirmPassword}
              onChange={(e) =>
                setRegisterForm({
                  ...registerForm,
                  confirmPassword: e.target.value,
                })
              }
              required={true}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent={'center'} mb={2}>
          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            color="secondary"
          >
            Register
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default register;
