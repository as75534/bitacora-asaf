import React, { Component, Fragment } from 'react'
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';

export default class XNavbar extends Component {
  constructor(props) {
    super(props);
      
    this.state = {
        isOpen: false
    };
  }

  render() {
      console.log(this.props.isAuthenticated);
    // Nav items to show in nav bar.
    const rightItems = (
        this.props.rightItems ? this.props.rightItems.map(i => {
            const navItem = (
                <NavItem key={i.title}>
                    <NavLink 
                        tag={Link} 
                        to={i.link ? i.link: ""} 
                        onClick={i.onClick}> 
                            {i.title} 
                    </NavLink>
                </NavItem>
            );
            if (this.props.isAuthenticated === true) {
                if (i.show === 0 || i.show === 1) {
                    return navItem;
                } else { return null }
            } else {
                if (i.show === 0 || i.show === -1) {
                    return navItem;
                } else { return null }
            }
        }) : null
    )

    const leftItems = (
        this.props.leftItems ? this.props.leftItems.map(i => {
            const navItem = (
                <NavItem key={i.title}>
                    <NavLink 
                        tag={Link} 
                        to={i.link ? i.link: ""} 
                        onClick={i.onClick}> 
                            {i.title} 
                    </NavLink>
                </NavItem>
            );
            if (this.props.isAuthenticated === true) {
                if (i.show === 0 || i.show === 1) {
                    return navItem;
                } else { return null }
            } else {
                if (i.show === 0 || i.show === -1) {
                    return navItem;
                } else { return null }
            }
        }) : null
    )

    return (
      <Fragment>
          <Navbar color="primary" dark expand="md">
          <NavbarBrand href="/">{this.props.title}</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
                { leftItems }
            </Nav>
            <Nav className="ml-auto" navbar>
                { rightItems }
            </Nav>
          </Collapse>
        </Navbar>
      </Fragment>
    )
  }
}

XNavbar.propTypes = {
    rightItems: PropTypes.array,
    leftItems: PropTypes.array,
};
