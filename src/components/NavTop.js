import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './css/NavTop.css';
import LogoSuspeitando from '../assets/img/suspeitando_logo_2.png';

class NavTop extends Component {
    handleNavLink = (event) => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute('href'));
    }
    handleExternalLink(url){
        window.location.assign(url);
    }
    render() {
        return (
            <div className="NavTop">
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">
                                <img src={LogoSuspeitando} alt="Suspeitando" style={{height:"35px"}}/>
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={2} onClick={this.handleExternalLink.bind(this, 'https://github.com/rafapetter/suspeitando')} >GitHub</NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} onClick={this.handleNavLink} href="/equipe">Equipe</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(NavTop);
