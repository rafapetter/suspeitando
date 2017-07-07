import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import './css/NavTop.css';
import LogoImg2 from '../assets/img/logo.svg';

class NavTop extends Component {
    handleNavLink = (event) => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute('href'));
    }
    render() {
        return (
            <div className="NavTop">
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">
                                <img src={LogoImg2} alt="CosmoBots" style={{height:"35px"}}/>
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
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
