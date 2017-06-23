import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Routes from './Routes';

class App extends Component {

    render() {
        return (
            <div className="">
                <Routes />
            </div>
        )
    }
}

export default withRouter(App);
