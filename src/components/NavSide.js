import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Nav, Panel} from 'react-bootstrap';
import RouteNavItem from './RouteNavItem';

class NavSide extends Component {
    handleNavLink = (event) => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute('href'));
    }
    render() {
        var activeHref;
        if (this.props.location.pathname){
            if (this.props.location.pathname.startsWith('/licitacoes/')){
                activeHref = '/licitacoes/';
            }
            else if (this.props.location.pathname.startsWith('/empresas/')){
                activeHref = '/empresas/';
            }
            else if (this.props.location.pathname.startsWith('/dashboard/')){
                activeHref = '/dashboard/';
            }
        }
        return (
            <div className="NavSide">
                <Panel className="SideMenu" header="">
                    <Nav bsStyle="pills" stacked activeHref={activeHref}>
                        <RouteNavItem onClick={this.handleNavLink} href={'/dashboard/'}>Dashboard</RouteNavItem>
                        <RouteNavItem onClick={this.handleNavLink} href={'/licitacoes/'}>Licitações</RouteNavItem>
                        <RouteNavItem onClick={this.handleNavLink} href={'/empresas/'}>Empresas</RouteNavItem>
                    </Nav>
                </Panel>
            </div>
        );
    }
}

export default withRouter(NavSide);
