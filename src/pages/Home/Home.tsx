import { Button, Stack, Typography, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const Home = (): JSX.Element => {
  const navigate = useNavigate()

  const handleClick = (): void => {
    navigate('/auth')
  }

  return (
    <>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          React mini-chat!
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          a simple chat, based on react with typescript,  material UI as component and style resource, working on my custom Socket IO API
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" onClick={handleClick}>Join our chat</Button>
          <Button variant="outlined">Learn more</Button>
        </Stack>
      </Container>
    </>
  );
}