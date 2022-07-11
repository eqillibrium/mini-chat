import { Theme } from '@mui/material/styles'
import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => createStyles({
  messageList: {
    width: '100%',
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'auto',
    height: '40vh',
    display: 'flex',
    flexDirection: 'column',
  }
}));