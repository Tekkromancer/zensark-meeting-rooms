import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import RoomFilter from '../../components/roomFilter';
import RoomRow from '../../components/roomRow';
import TimeSlider from '../../components/timeSlider';

import { loadData, addBooking } from './dataLoader';

import useStyles from './style';

const HomeScene = () => {
  const classes = useStyles();

  const [loaded, setLoaded] = useState(false);
  const [bookingName, setBookingName] = useState(false);
  const [allData, setAllData] = useState({});
  const [rooms, setRooms] = useState([]);
  const [timeRange, setTimeRange] = useState([]);
  const [date, setDate] = useState(() => {
    return moment(new Date()).format('YYYY/MM/DD');
  });

  const onComplete = useCallback(data => {
    console.log('onComplete', data);

    setAllData(data);
    setRooms(data.displayData);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (rooms.length > 1) return;
    if (loaded) return;
    loadData(onComplete);
  }, [onComplete, rooms])

  const onTimeChange = range => {
    setTimeRange(range);
  }

  let lastRoomType;
  let lastRoomCapacity;
  const onFilterChange = ({ bookingName, roomType, roomCapacity }) => {
    if (roomType === lastRoomType && roomCapacity === lastRoomCapacity) return;
    setBookingName(bookingName);
    lastRoomType = roomType;
    lastRoomCapacity = roomCapacity;

    const filteredRooms = allData.displayData.filter((item) => {
      let typeMatch = roomType === -1;
      let capacityMatch = roomCapacity === -1;

      const { roomType: { id: roomTypeID }, capacity: { id: capacityID } } = item;

      if (roomType > -1) {
        typeMatch = roomTypeID === roomType;
      }

      if (roomCapacity > -1) {
        capacityMatch = capacityID === roomCapacity;
      }

      return typeMatch && capacityMatch;
    });

    setRooms(filteredRooms);
  }

  const onCreateBooking = (data) => {
    addBooking(data, date, timeRange, onComplete);
  }

  const { config, roomTypes, roomCapacities } = allData;

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
        {config && <RoomFilter roomTypes={roomTypes} roomCapacities={roomCapacities} onChange={onFilterChange} />}
        {config && <TimeSlider config={config} onChange={onTimeChange} />}
        {rooms.length > 0 && config && rooms.map((data) => (
          <RoomRow
            key={`room${data.id}`}
            config={config}
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

