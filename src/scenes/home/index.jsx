import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import RoomRow from '../../components/roomRow';
import TimeSlider from '../../components/timeSlider';

import { loadData } from './dataLoader';

import useStyles from './style';

const HomeScene = () => {
  const classes = useStyles();

  const [roomData, setRoomData] = useState([]);
  const [configData, setConfigData] = useState();

  const onComplete = useCallback(data => {
    setRoomData(data.displayData);
    setConfigData(data.config);
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
        {configData && <TimeSlider config={configData} />}
        {roomData.length > 0 && roomData.map((data) => (
          <RoomRow key={`room${data.id}`} data={data} />
        ))}
      </Container>
    </Box>
  )
};

export default HomeScene;

