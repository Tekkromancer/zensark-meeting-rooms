import { makeStyles } from "@material-ui/core";

import { roomColumnWidth, rowPadding } from '../../scenes/home/style';

export default makeStyles({
  root: {
    marginTop: 5,
    padding: rowPadding,
    display: 'flex',
  },
  headerColumn: {
    width: roomColumnWidth,
    minWidth: roomColumnWidth,
    fontWeight: 'bold',
  },
  field: {
    minWidth: 150,
  }
});
