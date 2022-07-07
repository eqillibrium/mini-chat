import { Typography, Link } from '@mui/material'
import { GitHub } from '@mui/icons-material'

export const Copyright = ():JSX.Element => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/eqillibrium?tab=repositories" target={'_blank'}>
        { 'Naerdel ' } <GitHub />
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}