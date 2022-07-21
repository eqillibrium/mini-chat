import { ThemeProvider } from '@mui/material/styles'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home, Chat, Auth, NotFound } from './pages'
import { Layout } from './layout/Layout'
import { theme } from './theme'
import { ReactElement } from 'react'
import { RootState, store } from './store'
import { Provider, useSelector } from 'react-redux'

interface PrivateRouteProps {
  children: ReactElement
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const _id = useSelector((state: RootState) => state.user._id)
  return _id ? children : <Navigate to="/auth" />;
}

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
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
        </Provider>
      </ThemeProvider>
    </>
    );
}

export default App;
