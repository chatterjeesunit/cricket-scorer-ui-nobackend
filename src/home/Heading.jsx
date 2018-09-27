import React from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Routes } from '../routes/routes';

const Heading = () => (
  <Navbar color="dark" dark expand="md">
    <NavbarBrand href="#">Cric Scorer</NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink href={"#" + Routes.SCORER}>Scorer</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href={"#" + Routes.GAME_DETAILS}>Game Details</NavLink>
      </NavItem>
    </Nav>
  </Navbar>
);

export default Heading;
