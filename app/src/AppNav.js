import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap';

class AppNav extends Component {
    state = {  } 
    render() { 
        return (
            <div>
              <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Expense App</NavbarBrand>
                <Nav>
                    <NavItem>
                      <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/categories" >
                        Categories
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/expenses" >
                        Expenses
                      </NavLink>
                    </NavItem>
                </Nav>
              </Navbar>
            </div>
          );
    }
}
 
export default AppNav;