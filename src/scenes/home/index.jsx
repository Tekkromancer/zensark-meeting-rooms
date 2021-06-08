import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';

import useStyles from './style';

const HomeScene = () => {
  const classes = useStyles();

  return (

    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Paper className={classes.masthead}>
          <Grid container>
            <Grid item xs={12} justify="center">
              <Typography variant="h1" align="center">
                Meeting Room Booking App
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
};

export default HomeScene;

