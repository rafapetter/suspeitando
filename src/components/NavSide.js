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
            if (this.props.location.pathname.startsWith('/analises/')){
                activeHref = '/analises/';
            }
            else if (this.props.location.pathname.startsWith('/licitacoes/')){
                activeHref = '/licitacoes/';
            }
            else if (this.props.location.pathname.startsWith('/fornecedores/')){
                activeHref = '/fornecedores/';
            }
            else if (this.props.location.pathname.startsWith('/orgaos/')){
                activeHref = '/orgaos/';
            }

        }
        return (
            <div className="NavSide">
                <Panel className="SideMenu" header="">
                    <Nav bsStyle="pills" stacked activeHref={activeHref}>
                        <RouteNavItem onClick={this.handleNavLink} href={'/analises/'}>Análises</RouteNavItem>
                        <RouteNavItem onClick={this.handleNavLink} href={'/licitacoes/'}>Licitações</RouteNavItem>
                        <RouteNavItem onClick={this.handleNavLink} href={'/fornecedores/'}>Fornecedores</RouteNavItem>
                        <RouteNavItem onClick={this.handleNavLink} href={'/orgaos/'}>Orgãos</RouteNavItem>
                    </Nav>
                </Panel>
            </div>
        );
    }
}

export default withRouter(NavSide);
