import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-app-polyfill/stable';

import config from './configs/firebaseConfig';
import firebase from 'firebase/app';

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
