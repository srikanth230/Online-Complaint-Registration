import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import { NavLink, useNavigate } from 'react-router-dom';

import UserInfo from './UserInfo';
import AccordionAdmin from './AccordionAdmin';
import AgentInfo from './AgentInfo';

const AdminHome = () => {
   const navigate = useNavigate();
   const [activeComponent, setActiveComponent] = useState('dashboard');
   const [userName, setUserName] = useState('');
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { name } = user;
               setUserName(name);
            } else {
               navigate('/');
            }
         } catch (error) {
            console.error('Error fetching user data:', error);
            alert('Failed to load user data. Redirecting to login...');
            navigate('/');
         } finally {
            setLoading(false);
         }
      };

      getData();
   }, [navigate]);

   const handleNavLinkClick = (componentName) => {
      setActiveComponent(componentName);
   };

   const LogOut = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) return 'Good Morning';
      if (currentHour < 18) return 'Good Afternoon';
      return 'Good Evening';
   };

   return (
      <>
         <Navbar className="text-white" bg="dark" expand="lg">
            <Container fluid>
               <Navbar.Brand className="text-white">
                  {loading ? (
                     <Spinner animation="border" size="sm" />
                  ) : (
                     `${getGreeting()}, Admin ${userName}`
                  )}
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav className="text-white me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                     <NavLink
                        className={`nav-link text-light ${activeComponent === 'dashboard' ? 'active' : ''}`}
                        onClick={() => handleNavLinkClick('dashboard')}
                     >
                        Dashboard
                     </NavLink>
                     <NavLink
                        className={`nav-link text-light ${activeComponent === 'UserInfo' ? 'active' : ''}`}
                        onClick={() => handleNavLinkClick('UserInfo')}
                     >
                        User
                     </NavLink>
                     <NavLink
                        className={`nav-link text-light ${activeComponent === 'Agent' ? 'active' : ''}`}
                        onClick={() => handleNavLinkClick('Agent')}
                     >
                        Agent
                     </NavLink>
                  </Nav>
                  <Button onClick={LogOut} variant="outline-danger">
                     Log out
                  </Button>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <div className="content" style={{ padding: '20px' }}>
            {loading ? (
               <div className="text-center">
                  <Spinner animation="border" variant="primary" />
                  <p>Loading...</p>
               </div>
            ) : (
               <>
                  {activeComponent === 'dashboard' && <AccordionAdmin />}
                  {activeComponent === 'UserInfo' && <UserInfo />}
                  {activeComponent === 'Agent' && <AgentInfo />}
                  {!activeComponent && (
                     <div className="text-center">
                        <h4>Welcome! Please select an option from the menu.</h4>
                     </div>
                  )}
               </>
            )}
         </div>
      </>
   );
};

export default AdminHome;
