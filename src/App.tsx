import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { authRoutes } from './routes';
import Main from './Main';
import { RootState } from './store/reducers';
import { connect } from 'react-redux';
import { AuthState } from './store/reducers/authReducer';
import CustomAlert from './components/UI/CustomAlert';

const App = ({ isAuth }: AuthState) => {
  return (
    <>
      {/* <CustomAlert isOpen={} text={} /> */}
      {!isAuth ? (
        <Switch>
          {authRoutes.map((route) => (
            <Route key={route.url} path={route.url} exact>
              {route.component}
            </Route>
          ))}
          <Redirect to="/login" />
        </Switch>
      ) : (
        <Main />
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps)(App);
