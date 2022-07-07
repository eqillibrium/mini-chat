import { Typography,  Box, Container } from '@mui/material'
import { Copyright } from '../../components'

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h6" align="center" gutterBottom>
          PinkChat!
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          My awesome and simple react chat in cute pink color
        </Typography>
        <Copyright />
      </Container>
    </Box>
  )
}