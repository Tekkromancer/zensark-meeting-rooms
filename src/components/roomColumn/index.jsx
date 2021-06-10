import React from 'react';

import TvIcon from '@material-ui/icons/Tv';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import WcIcon from '@material-ui/icons/Wc';
import PeopleIcon from '@material-ui/icons/People';

import useStyles from './style';
import { Button } from '@material-ui/core';

const typeIcons = [
  EventSeatIcon,
  WcIcon,
  TvIcon,
];

const RoomColumn = ({
  data,
  bookingAllowed,
  onCreateBooking,
}) => {
  const classes = useStyles();
  const TypeIcon = typeIcons[data.roomType.id];

  const createBooking = () => {
    onCreateBooking(data);
  }

  return (
    <div className={classes.root}>
      <div className={classes.nameSection}>{data.name}</div>
      <div className={classes.detailSection}>
        <TypeIcon className={classes.roomTypeIcon} />
        <PeopleIcon />
        <span className={classes.capacityValue}>{data.capacity.capacity}</span>
      </div>
      <Button
        variant="contained"
        disabled={!bookingAllowed}
        color="primary"
        onClick={createBooking}
      >Book Room</Button>
    </div>
  );
}

export default RoomColumn;