import { makeStyles } from "@material-ui/core";

import { roomColumnWidth } from '../../scenes/home/style';

export default makeStyles({
  root: {
    width: roomColumnWidth,
  },
  nameSection: {
    fontWeight: 'bold',
  },
  detailSection: {
    display: 'flex',
  },

  roomTypeIcon: {
    marginRight: 5,
  },
  capacityValue: {
    fontWeight: 'bold',
    fontSize: '1em',
    display: 'flex',
    alignItems: 'center',
  }
});
