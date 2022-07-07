import { createTheme, Theme } from '@mui/material/styles'
import { makeStyles, createStyles} from '@mui/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: "#f48fb1",
    },
    secondary: {
      main: "#fce4ec",
    },
  },
});

// const useStyles = makeStyles((theme: Theme) => createStyles({
//   header: {
//     backgroundColor: theme.palette.primary.main
//   }
// }));

export { theme }