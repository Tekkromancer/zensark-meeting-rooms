import { Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

import useStyles from './style';

const RoomFilter = ({
  roomTypes,
  roomCapacities,
  onChange
}) => {
  const classes = useStyles();

  const [bookingName, setBookingName] = useState('');
  const [roomType, setRoomType] = useState(-1);
  const [roomCapacity, setRoomCapacity] = useState(-1);

  const onFilterChange = (value) => {
    const payload = {
      bookingName,
      roomType,
      roomCapacity,
      ...value,
    };

    onChange(payload);
  };

  const onNameChange = ({ target: { value } }) => {
    setBookingName(value);
    onFilterChange({ name: value });
  }
  const onRoomTypeChange = ({ target: { value } }) => {
    setRoomType(value);
    onFilterChange({ roomType: value });
  }
  const onRoomCapacityChange = ({ target: { value } }) => {
    setRoomCapacity(value);
    onFilterChange({ roomCapacity: value });
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.headerColumn}>
        Booking Info
      </div>
      <Grid container>
        <Grid item xs={3}>
          <TextField
            id="meeting-title"
            label="Booking Name"
            value={bookingName || ''}
            onChange={onNameChange} />
        </Grid>
        <Grid item xs={3}>
          <InputLabel id="room-type">Room Type</InputLabel>
          <Select
            labelId="room-type"
            id="select-room-type"
            value={roomType}
            className={classes.field}
            onChange={onRoomTypeChange}
          >
            <MenuItem
              key={`rt_any`}
              value={-1}>Any</MenuItem>
            {roomTypes.map(item => (
              <MenuItem
                key={`rt_${item.id}`}
                value={item.id}>{item.title}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={3}>
          <InputLabel id="room-type">Room Capacity</InputLabel>
          <Select
            labelId="capacity"
            id="select-capacity"
            value={roomCapacity}
            className={classes.field}
            onChange={onRoomCapacityChange}
          >
            <MenuItem
              key={`c_any`}
              value={-1}>Any</MenuItem>
            {roomCapacities.map(item => (
              <MenuItem
                key={`c_${item.id}`}
                value={item.id}>
                {item.title} ({item.capacity} People)
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default RoomFilter;