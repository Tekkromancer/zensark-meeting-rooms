import { makeStyles } from "@material-ui/core";

import { roomColumnWidth } from '../../scenes/home/style';

export default makeStyles({
  root: {
    marginTop: 5,
    padding: 5,
    display: 'flex',
  },
  headerColumn: {
    width: roomColumnWidth,
    fontWeight: 'bold',
  }
});
