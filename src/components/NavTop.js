import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
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
                            <NavDropdown eventKey={1} title="Username" id="basic-nav-dropdown">
                                <MenuItem eventKey={1.1}>Account</MenuItem>
                                <MenuItem eventKey={1.2}>Settings</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={1.3} onClick={this.props.handleLogout}>Logout</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(NavTop);
