import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { NavItem } from 'react-bootstrap';

class RouteNavItem extends Component {
    render() {
        return (
            <Route path={this.props.href} exact children={({ match }) => (
                <NavItem {...this.props} active={ (this.props.href === this.props.activeHref) ? true : false }>{ this.props.children }</NavItem>
            )}/>
        );
    }
}
export default (RouteNavItem);
