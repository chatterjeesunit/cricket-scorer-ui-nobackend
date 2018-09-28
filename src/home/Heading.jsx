import React from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Routes } from '../routes/routes';

const getClassName = (props, button) => {
  let className = '';
  if (props.pageName === 'gameDetails' && button === Routes.GAME_DETAILS) {
    className = 'dark';
  } else if (props.pageName === 'gameDetails' && button === Routes.SCORER) {
    className = 'light';
  }

  if (props.pageName === 'scorer' && button === Routes.SCORER) {
    className = 'dark';
  } else if (props.pageName === 'scorer' && button === Routes.GAME_DETAILS) {
    className = 'light';
  }
  return className;
};

const Heading = props => (
  <Navbar color="dark" dark expand="md">
    <NavbarBrand href="#">Cr.III.C 5C0R3R</NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink className={getClassName(props, Routes.SCORER)} href={"#" + Routes.SCORER}>Scorer</NavLink>
      </NavItem>
      <NavItem>
        <NavLink className={getClassName(props, Routes.GAME_DETAILS)} href={"#" + Routes.GAME_DETAILS}>Game Details</NavLink>
      </NavItem>
    </Nav>
  </Navbar>
);

export default Heading;
