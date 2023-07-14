import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BsCoin } from 'react-icons/bs';
import { changeCurrentTabAndNavigateTo } from '../../utils/navigationUtils';

const UserNavbar = () => {
  const navigate = useNavigate();

  const goToTab = (routeName) => {
    const newUrl = changeCurrentTabAndNavigateTo(routeName);
    navigate(newUrl);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <BsCoin />
        </Navbar.Brand>
        <Navbar.Toggle  area-controls="home-navbar"/> {/* area-controls needs the id of the navbar it is trying to collapse*/}
        <Navbar.Collapse id="home-navbar">
          <Nav>
            <Nav.Link onClick={() => goToTab('/home')}>Home</Nav.Link>
            <Nav.Link onClick={() => goToTab('/sell')}>Sell</Nav.Link>
            <Nav.Link onClick={() => goToTab('/transactions')}>Transactions</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/logout">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;
