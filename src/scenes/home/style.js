import { makeStyles } from "@material-ui/core";

export const roomColumnWidth = 150;
export const rowPadding = 10;


export default makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'hsl(200deg 100% 88%)',
        // minHeight: '100vh',
  },
  masthead: {
    padding: 20,
    marginTop: 20
  },
});
