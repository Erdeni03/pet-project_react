import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../routes'
import Dashboard from './dashboard'
import { RootState } from '../store/reducers'
import { connect } from 'react-redux'
import CustomAlert from './UI/CustomAlert'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { initialUser } from '../store/action-creators/auth'
import firebase from 'firebase/compat/app'
import CustomLoader from './UI/CustomLoader'
import { createTheme, MuiThemeProvider } from '@material-ui/core'

interface StoreProps {
  isAuth: boolean | null
  currentUser: null | firebase.User | undefined
  loading: boolean
}

type AllProps = StoreProps & typeof mapDispatchToProps

const App = ({ initialUser, currentUser, loading }: AllProps) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (!localStorage.getItem('DarkMode')) {
      return false
    } else {
      return JSON.parse(localStorage.getItem('DarkMode') as string)
    }
  })

  useEffect(() => {
    setUserWithFirebase()
    // eslint-disable-next-line
  }, [])

  const setUserWithFirebase = async () => {
    const auth = getAuth()
    await onAuthStateChanged(auth, (user) => {
      if (user && !currentUser) {
        initialUser(user)
      }
      if (!user) {
        initialUser(null)
      }
    })
  }

  const switchMode = () => {
    const value = JSON.parse(localStorage.getItem('DarkMode') as string)
    setIsDarkMode(!value)
    localStorage.setItem('DarkMode', JSON.stringify(!value))
  }

  const theme = createTheme({
    palette: { type: isDarkMode ? 'dark' : 'light' },
    overrides: {
      // Style sheet name ⚛️
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: '#01A0D7',
        },
        // Name of the rule
        // Some CSS
      },
    },
  })
  if (loading) {
    return <CustomLoader />
  }

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CustomAlert />
        {!loading && currentUser ? (
          <Dashboard
            currentUser={currentUser}
            switchMode={switchMode}
            isDarkMode={isDarkMode}
          />
        ) : (
          <Switch>
            {routes.auth.map((route) => (
              <Route key={route.url} path={route.url} exact>
                {route.component}
              </Route>
            ))}
            <Redirect to="/login" />
          </Switch>
        )}
      </MuiThemeProvider>
    </>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.auth.currentUser,
    loading: state.auth.loading,
  }
}
const mapDispatchToProps = {
  initialUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
