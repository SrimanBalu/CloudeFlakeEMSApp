import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { FiHome, FiUsers, FiLogOut, FiMenu } from 'react-icons/fi';
import { TiBusinessCard } from 'react-icons/ti';

function NavbarComponent({ onLogout }) {
  const navigate = useNavigate();
  const username = localStorage.getItem('user');

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <Navbar expand="lg" sticky="top" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard" className="fw-bold text-white d-flex align-items-center gap-2">
          <TiBusinessCard size={28} />
          <span className="d-none d-sm-inline">CloudeFlake EMS</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-light">
          <FiMenu size={24} color="white" />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-2">
            <Nav.Link as={Link} to="/dashboard" className="text-white d-flex align-items-center gap-2 nav-link">
              <FiHome size={18} />
              <span className="d-none d-lg-inline">Dashboard</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/employees" className="text-white d-flex align-items-center gap-2 nav-link">
              <FiUsers size={18} />
              <span className="d-none d-lg-inline">Employees</span>
            </Nav.Link>
            
            <div className="nav-divider mx-3 d-none d-lg-block" style={{ borderRight: '1px solid rgba(255,255,255,0.3)', height: '24px' }}></div>
            
            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0 ms-lg-3">
              <span className="text-white small d-flex align-items-center gap-2">
                <div 
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  {username?.charAt(0).toUpperCase()}
                </div>
                <span className="d-none d-lg-inline"><strong>{username}</strong></span>
              </span>
              <Button
                variant="outline-light"
                size="sm"
                onClick={handleLogout}
                className="d-flex align-items-center gap-2 nav-link px-3"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <FiLogOut size={16} />
                <span className="d-none d-lg-inline">Logout</span>
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
