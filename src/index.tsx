import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// @ts-ignore
firebase.initializeApp({
  apiKey: 'AIzaSyAA9QYdH2B7u_s6zE-w1iAuADVvGvVN-7s',
  authDomain: 'study-react-c32e2.firebaseapp.com',
  projectId: 'study-react-c32e2',
  storageBucket: 'study-react-c32e2.appspot.com',
  messagingSenderId: '658814085358',
  appId: '1:658814085358:web:7b6d7a03f0a0a5a11debff',
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
