import { Theme } from '@mui/material/styles'
import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => createStyles({
  header: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'end'
  }
}));