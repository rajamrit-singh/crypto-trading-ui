import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BsCoin } from 'react-icons/bs';
import { changeCurrentTabAndNavigateTo, getUserIdFromUrl } from '../../utils/navigationUtils';
import { CgProfile } from 'react-icons/cg';
import './UserNavbar.css';


const UserNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const balance = '$1000';
  const navigate = useNavigate();

  const goToTab = (routeName) => {
    const id = getUserIdFromUrl();
    navigate(`/${id}${routeName}`);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate(`/`);
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container id="custom-container">
        <Navbar.Brand>
          <BsCoin />
        </Navbar.Brand>
        <Navbar.Toggle area-controls="home-navbar" />
        <Navbar.Collapse id="home-navbar">
          <Nav>
            <Nav.Link onClick={() => goToTab('/home')}>Home</Nav.Link>
            <Nav.Link onClick={() => goToTab('/sell')}>Sell</Nav.Link>
            <Nav.Link onClick={() => goToTab('/transactions')}>Transactions</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Nav className="icon-container">
        {/* User Balance */}
        <Nav.Link className="balance">
          Balance: <span className="balance-amount">{balance}</span>
        </Nav.Link>
        <Nav.Link
          className="profile-icon"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <CgProfile size={25} />
        </Nav.Link>
        {showDropdown && (
          <Dropdown className="profile-dropdown" align="end" show={showDropdown}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => console.log('My Profile Clicked')}>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogOut}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Nav>
    </Navbar>
  );
};

export default UserNavbar;
