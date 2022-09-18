import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const index: React.FC = () => {
  return (
    <Box>
      <Grid container mb={2}>
        <Grid item>
          <Typography variant='h4'>Choose a race</Typography>
          <Typography variant='subtitle1'>
            Ready to test your typing speed? Choose a race below
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent='center' mb={2}>
        <Grid item xs={12} sm={6}>
          <Grid component={Card} style={{ height: '100%' }}>
            <CardContent>
              <Typography variant='h5'>Solo Test!</Typography>
              <Typography>Practice your typing speed on your own</Typography>
            </CardContent>
            <CardActions>
              <a href={'/typerace/solorace'}>
                <Button variant='contained' color='secondary'>
                  Play
                </Button>
              </a>
            </CardActions>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid component={Card} style={{ height: '100%' }}>
            <CardContent>
              <Typography variant='h5'>Online Race! - Coming Soon</Typography>
              <Typography variant='body1'>
                Test your typing speed against other players!
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={'#'}>
                <Button variant='contained' color='secondary' disabled>
                  Play
                </Button>
              </Link>
            </CardActions>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default index;
