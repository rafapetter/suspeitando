import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import {PageHeader} from 'react-bootstrap';

class Home extends Component {
    componentDidMount() {
        this.props.history.push('/analises/');
    }
    render() {
        return (
        <div className="lics">
            <PageHeader>Home</PageHeader>
            <div>
                Teste
            </div>
        </div>
        );
    }
}
export default withRouter(Home);
