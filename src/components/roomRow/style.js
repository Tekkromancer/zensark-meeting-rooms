import { makeStyles } from "@material-ui/core";

import { rowPadding } from '../../scenes/home/style';

const blockBorder = '1px solid black';

export default makeStyles({
  roomRow: {
    marginTop: 5,
    padding: rowPadding,
    display: 'flex',
    alignItems: 'center',
  },
  timeline: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    width: '100%'
  },
  block: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
    padding: 5,
    height: 40,
    // borderLeft: blockBorder,
    // borderRight: blockBorder,
    '& > div': {
      fontSize: 10,
      fontWeight: 'bold',
      display: 'flex',
      flexDirection: 'column',
    }
  },


});
