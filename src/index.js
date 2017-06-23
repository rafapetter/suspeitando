import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import './assets/bootstrap/v3/css/bootstrap.min.css';


ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
