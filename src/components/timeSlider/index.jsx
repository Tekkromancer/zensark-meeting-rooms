import { Paper, Slider, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';

import useStyles from './style';

const valuetext = value => {
  let hours = Math.floor(value / 60);
  const meridian = hours < 12 ? 'AM' : 'PM';
  if (meridian === 'PM') hours -= 12;

  if (hours === 0) hours = 12;

  const minutes = value % 60;
  return `${hours}: ${minutes === 0 ? '00' : minutes} ${meridian}`;
};

const ValueLabelComponent = props => {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
};

const TimeSlider = ({ config }) => {
  const classes = useStyles();


  const [value, setValue] = useState(() => {
    const now = new Date();

    let currentHour = now.getHours() * 60;
    let currentMinutes = now.getMinutes();

    let startHour = currentHour;
    let startMinutes = (Math.ceil(currentMinutes / config.increment) * config.increment);
    const minuteDelta = startMinutes - 60;
    if (minuteDelta > 0) {
      startMinutes = minuteDelta;
      startHour++;
    }

    const startTime = startHour + startMinutes;
    const endTime = startTime + config.defaultMeetingLength;

    return [startTime, endTime];
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const min = config.start * 60;
  const max = config.end * 60;
  const step = config.increment;

  return (
    <Paper className={classes.root}>
      <div className={classes.headerColumn}>
        Time
      </div>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        valueLabelDisplay="on"
        ValueLabelComponent={ValueLabelComponent}
        valueLabelFormat={valuetext}
        marks={true}
      />
    </Paper>
  )
}

export default TimeSlider;