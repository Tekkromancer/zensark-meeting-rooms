import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import RoomRow from '../../components/roomRow';
import TimeSlider from '../../components/timeSlider';

import { loadData, addBooking } from './dataLoader';

import useStyles from './style';

const HomeScene = () => {
  const classes = useStyles();

  const [roomData, setRoomData] = useState([]);
  const [configData, setConfigData] = useState();
  const [timeRange, setTimeRange] = useState([]);
  const [date, setDate] = useState(() => {
    return moment(new Date()).format('YYYY/MM/DD');
  });

  const onComplete = useCallback(data => {
    console.log('onComplete', data);
    setRoomData(data.displayData);
    setConfigData(data.config);
  }, []);

  useEffect(() => {
    if (roomData.length > 1) return;
    loadData(onComplete);
  }, [onComplete, roomData])

  const onTimeChange = range => {
    setTimeRange(range);
  }

  const onCreateBooking = (data) => {
    addBooking(data, date, timeRange, onComplete);
  }

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
        {configData && <TimeSlider config={configData} onChange={onTimeChange} />}
        {roomData.length > 0 && configData && roomData.map((data) => (
          <RoomRow
            key={`room${data.id}`}
            config={configData}
            data={data}
            onCreateBooking={onCreateBooking}
            timeRange={timeRange}
          />
        ))}
      </Container>
    </Box>
  )
};

export default HomeScene;

