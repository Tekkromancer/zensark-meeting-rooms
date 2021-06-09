import React from 'react';

import { Grid, Paper } from '@material-ui/core';

import RoomColumn from '../roomColumn';

import useStyles from './style';

const RoomRow = ({
  data
}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Paper className={classes.roomRow}>
        <RoomColumn data={data} />
      </Paper>
    </Grid>
  );
}

export default RoomRow;