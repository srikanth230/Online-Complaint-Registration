import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link, useLocation } from 'react-router-dom';
import Image1 from '../../Images/Image1.png';
import Footer from './FooterC';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Fade from 'react-reveal/Fade';

const Home = () => {
   const location = useLocation();

   return (
      <>
         {/* Navbar */}
         <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
               <Navbar.Brand as={Link} to="/">
                  ResolveX
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="navbar-nav" />
               <Navbar.Collapse id="navbar-nav">
                  <Nav className="ml-auto">
                     <Nav.Link as={Link} to="/" active={location.pathname === '/'}>
                        Home
                     </Nav.Link>
                     <Nav.Link as={Link} to="/signup" active={location.pathname === '/signup'}>
                        SignUp
                     </Nav.Link>
                     <Nav.Link as={Link} to="/login" active={location.pathname === '/login'}>
                        Login
                     </Nav.Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         {/* Main Content */}
         <Container className="home-container d-flex align-items-center justify-content-between my-5">
            <Fade left>
               <div className="left-side">
                  <img src={Image1} alt="Empowering teams with ResolveX" className="img-fluid" />
               </div>
            </Fade>
            <Fade right>
               <div className="right-side">
                  <p>
                     <span className="f-letter">Empower Your Team,</span>
                     <br />
                     <span className="s-letter">Exceed Customer Expectations:</span>
                     <br />
                     <span className="t-letter">Discover our Complaint Management Solution</span>
                     <br />
                  </p>
                  <Link to="/signup">
                     <Button className="mt-3 register" aria-label="Register your complaint">
                        Register Your Complaint
                     </Button>
                  </Link>
                  <Link to="/about">
                     <Button variant="outline-light" className="mt-3 ml-2" aria-label="Learn more about us">
                        Learn More
                     </Button>
                  </Link>
               </div>
            </Fade>
         </Container>

         {/* Footer */}
         <Footer>
            <div className="footer-socials text-center mt-4">
               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebook size={24} className="mx-2 text-primary" />
               </a>
               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FaTwitter size={24} className="mx-2 text-info" />
               </a>
               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin size={24} className="mx-2 text-primary" />
               </a>
            </div>
         </Footer>
      </>
   );
};

export default Home;
