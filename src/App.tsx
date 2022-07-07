import { ThemeProvider } from '@mui/material/styles'
import { Routes, Route } from 'react-router-dom'
import { Home, Chat, Auth } from './pages'
import { Layout } from './layout/Layout'
import { theme } from './theme'

function App() {
  return (
      <>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route
              path="/"
              element={<Layout />}
            >
              <Route
                index
                element={<Home />}
              />
              <Route
                path="/chat"
                element={<Chat />}
              />
              <Route
                path="/auth"
                element={<Auth />}
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </>
    );
}

export default App;
