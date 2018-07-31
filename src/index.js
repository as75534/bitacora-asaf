import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from "firebase/app";

firebase.initializeApp({
    apiKey: "AIzaSyB8rHu-ufgHZA9rHaxGUVq5lQAzAEZPZcA",
    authDomain: "bitacora-asaf.firebaseapp.com",
    databaseURL: "https://bitacora-asaf.firebaseio.com",
    projectId: "bitacora-asaf",
    storageBucket: "bitacora-asaf.appspot.com",
    messagingSenderId: "458874200808"
})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
