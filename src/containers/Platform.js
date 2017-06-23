import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import NavTop from '../components/NavTop';
import NavSide from '../components/NavSide';

class Platform extends Component {

    render() {
        return (
            <div className="Platform">
                <NavTop />
                <div className="col-sm-2">
                    <NavSide />
                </div>
                <div className="col-sm-10">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default withRouter(Platform);
