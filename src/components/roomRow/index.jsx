import React from 'react';

import { Grid, Paper } from '@material-ui/core';

import RoomColumn from '../roomColumn';

import useStyles from './style';
import { getTimeText } from '../../utils/textUtils';
import { canBook } from '../../scenes/home/dataLoader';

import DeleteIcon from '@material-ui/icons/Delete';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const getBlocks = ({ config, data: { bookings } }) => {
  const startMinutes = config.start * 60;
  const endMinutes = config.end * 60;

  const blocks = [];

  bookings.forEach((booking, i) => {
    // Start Block
    if (i === 0) {
      if (booking.start > startMinutes) {
        blocks.push({
          duration: booking.start - startMinutes,
          startText: getTimeText(startMinutes),
          endText: getTimeText(booking.start),
          available: true
        });
      }
    }

    // current block
    blocks.push({
      id: booking.id,
      duration: booking.end - booking.start,
      startText: getTimeText(booking.start),
      endText: getTimeText(booking.end),
      available: false
    });

    // if it's the last booking
    if (i === bookings.length - 1) {
      blocks.push({
        duration: endMinutes - booking.end,
        startText: getTimeText(booking.end),
        endText: getTimeText(endMinutes),
        available: true
      });

    } else {
      const nextBooking = bookings[i + 1];
      if (nextBooking.start > booking.end) {
        blocks.push({
          duration: nextBooking.start - booking.end,
          startText: getTimeText(booking.end),
          endText: getTimeText(nextBooking.start),
          available: true
        });
      }
    }
  });

  if (blocks.length === 0) {
    blocks.push({
      duration: endMinutes - startMinutes,
      startText: getTimeText(startMinutes),
      endText: getTimeText(endMinutes),
      available: true
    });
  }

  return blocks;
};

const RoomRow = ({
  data,
  config,
  onCreateBooking,
  onDeleteBooking,
  timeRange,
}) => {
  const classes = useStyles();

  const totalTime = (config.end - config.start) * 60;

  const getWidthPercent = duration => `${duration / totalTime * 100}%`;

  const blocks = getBlocks({ config, data });

  const bookingAllowed = canBook({ data, timeRange });

  const onDelete = id => () => {
    onDeleteBooking(id);
  }

  return (
    <Grid item xs={12}>
      <Paper className={classes.roomRow}>
        <RoomColumn data={data} onCreateBooking={onCreateBooking} bookingAllowed={bookingAllowed} />
        <div className={classes.timeline}>
          {blocks.map((block, i) => (
            <div
              key={`${data.id}_b_${i}`}
              className={classes.block}
              style={{
                backgroundColor: block.available ? 'green' : 'red',
                width: getWidthPercent(block.duration),
              }}
            >
              <div className={classes.blockLeft}>
                <div>{block.startText}</div>
              </div>
              <div className={classes.blockRight}>
                {!block.available ? (
                  <HighlightOffIcon
                    className={classes.deleteIcon}
                    onClick={onDelete(block.id)}
                  />
                ) : <div />}
                <div style={{ justifyContent: 'flex-end', alignItems: 'flex-end', textAlign: 'right' }}>{block.endText}</div>
              </div>
            </div>
          ))}
        </div>
      </Paper>
    </Grid>
  );
}

export default RoomRow;