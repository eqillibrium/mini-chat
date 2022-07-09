import { ThemeProvider } from '@mui/material/styles'
import { Routes, Route } from 'react-router-dom'
import { Home, Chat, Auth, NotFound } from './pages'
import { Layout } from './layout/Layout'
import { theme } from './theme'
import { AppContextProvider } from './context/App.context'

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppContextProvider>
        <Routes>
          <Route
            path="/"
            // @ts-ignore
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
            <Route
              path={'*'}
              element={<NotFound />}
            />
          </Route>
        </Routes>
        </AppContextProvider>
      </ThemeProvider>
    </>
    );
}

export default App;
