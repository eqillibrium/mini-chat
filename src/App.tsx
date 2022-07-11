import { ThemeProvider } from '@mui/material/styles'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home, Chat, Auth, NotFound } from './pages'
import { Layout } from './layout/Layout'
import { theme } from './theme'
import { AppContext, AppContextProvider } from './context/App.context'
import { ReactElement, useContext } from 'react'

interface PrivateRouteProps {
  children: ReactElement
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { userID } = useContext(AppContext);
  return userID ? children : <Navigate to="/auth" />;
}

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
              element={<PrivateRoute><Chat /></PrivateRoute>}
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
