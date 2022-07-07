import { Header } from './header/Header'
import { Nav } from '../components'
import { Container, Box, CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Footer } from './footer/Footer'

export const Layout = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
      <Header>
        <Nav />
      </Header>
      <Container maxWidth='xl' style={{ padding: '5%' }} component={'main'}>
        <Outlet />
      </Container>
      <Footer />
      </Box>
    </>
  )
}