import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { FiHome, FiUsers, FiLogOut, FiMenu } from 'react-icons/fi';
import { TiBusinessCard } from 'react-icons/ti';
import { authAPI } from '../services/api';
import { isAdmin } from '../utils/auth';

function NavbarComponent({ onLogout }) {
  const navigate = useNavigate();
  const user = authAPI.getUser();
  const userInitial = user?.name?.charAt(0).toUpperCase() || 'U';
  const userDisplay = user?.name || 'User';
  const userRole = user?.roleName || 'User';

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <Navbar expand="md" sticky="top" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard" className="fw-bold text-white d-flex align-items-center gap-2">
          <TiBusinessCard size={28} />
          <span>CloudFlake EMS</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-light">
          <FiMenu size={24} color="white" />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-md-center gap-2 flex-column flex-md-row">
            <Nav.Link as={Link} to="/dashboard" className="text-white d-flex align-items-center gap-2 nav-link">
              <FiHome size={18} />
              <span>Dashboard</span>
            </Nav.Link>
            
            {/* Only show Employees link for Admin users */}
            {isAdmin() && (
              <Nav.Link as={Link} to="/employees" className="text-white d-flex align-items-center gap-2 nav-link">
                <FiUsers size={18} />
                <span>Employees</span>
              </Nav.Link>
            )}
            
            <div className="nav-divider mx-3 d-none d-md-block" style={{ borderRight: '1px solid rgba(255,255,255,0.3)', height: '24px' }}></div>
            
            <div className="d-flex align-items-center gap-2 gap-lg-3 mt-3 mt-md-0 ms-md-3 flex-wrap">
              <span className="text-white small d-flex align-items-center gap-2" style={{ fontSize: '0.85rem' }}>
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
                    fontWeight: '600',
                    flexShrink: 0
                  }}
                >
                  {userInitial}
                </div>
                <span style={{ minWidth: '80px' }}>
                  <div style={{ lineHeight: '1.2', fontSize: '0.8rem' }}>
                    <strong>{userDisplay}</strong>
                    <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{userRole}</div>
                  </div>
                </span>
              </span>
              <Button
                variant="outline-light"
                size="sm"
                onClick={handleLogout}
                className="d-flex align-items-center gap-2 nav-link px-2 px-md-3"
                style={{ borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}
              >
                <FiLogOut size={16} />
                <span>Logout</span>
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
