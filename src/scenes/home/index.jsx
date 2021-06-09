import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import RoomRow from '../../components/roomRow';

import { loadData } from './dataLoader';

import useStyles from './style';

const HomeScene = () => {
  const classes = useStyles();

  const [roomData, setRoomData] = useState([]);

  const onComplete = useCallback(data => {
    console.log('data', data);
    setRoomData(data.displayData);
  }, []);

  useEffect(() => {
    if (roomData.length > 1) return;
    loadData(onComplete);
  }, [onComplete, roomData])

  return (

    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Paper className={classes.masthead}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                Meeting Room Booking Tool
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        {roomData.length > 0 && roomData.map((data) => (
          <RoomRow key={`room${data.id}`} data={data} />
        ))}
      </Container>
    </Box>
  )
};

export default HomeScene;

