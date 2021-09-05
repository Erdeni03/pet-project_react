import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { authRoutes } from '../routes'
import Main from './Main'
import { RootState } from '../store/reducers'
import { connect } from 'react-redux'
import CustomAlert from './UI/CustomAlert'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { initialUser } from '../store/action-creators/auth'
import firebase from 'firebase/compat/app'
import CustomLoader from './UI/CustomLoader'

interface StoreProps {
  isAuth: boolean | null
  currentUser: null | firebase.User | undefined
  loading: boolean
}

type AllProps = StoreProps & typeof mapDispatchToProps

const App = ({ initialUser, currentUser, loading }: AllProps) => {
  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      initialUser(user)
    })
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <CustomLoader />
  }

  return (
    <>
      <CustomAlert />
      {!loading && currentUser ? (
        <Main />
      ) : (
        <Switch>
          {authRoutes.map((route) => (
            <Route key={route.url} path={route.url} exact>
              {route.component}
            </Route>
          ))}
          <Redirect to="/login" />
        </Switch>
      )}
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
