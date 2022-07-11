import { Theme } from '@mui/material/styles'
import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => createStyles({
  message: {
    border: '1px solid lightgray',
    color: 'dimgray',
    marginBottom: '10px',
    borderRadius: '10px',
    maxWidth: '300px',
  }
}));