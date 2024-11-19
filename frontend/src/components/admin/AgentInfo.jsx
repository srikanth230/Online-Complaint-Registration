import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Footer from '../common/FooterC';
import axios from 'axios';

const AgentInfo = () => {
   const navigate = useNavigate();
   const [agentList, setAgentList] = useState([]);
   const [loading, setLoading] = useState(true);
   const [toggle, setToggle] = useState({});
   const [updateAgent, setUpdateAgent] = useState({ name: '', email: '', phone: '' });

   useEffect(() => {
      const fetchAgents = async () => {
         try {
            const response = await axios.get('http://localhost:8000/agentUsers');
            setAgentList(response.data);
         } catch (error) {
            console.error('Error fetching agents:', error);
         } finally {
            setLoading(false);
         }
      };

      fetchAgents();
   }, [navigate]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdateAgent((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (agentId) => {
      if (!updateAgent.name && !updateAgent.email && !updateAgent.phone) {
         alert('Please fill at least one field to update.');
         return;
      }

      const confirmed = window.confirm('Are you sure you want to update this agent?');
      if (!confirmed) return;

      try {
         const updates = Object.fromEntries(
            Object.entries(updateAgent).filter(([_, value]) => value) // Filter empty fields
         );
         await axios.put(`http://localhost:8000/user/${agentId}`, updates);
         alert('Agent updated successfully');
         setAgentList((prev) =>
            prev.map((agent) => (agent._id === agentId ? { ...agent, ...updates } : agent))
         );
         setUpdateAgent({ name: '', email: '', phone: '' });
         handleToggle(agentId); // Close the form
      } catch (error) {
         console.error('Error updating agent:', error);
         alert('Failed to update agent. Please try again.');
      }
   };

   const deleteUser = async (agentId) => {
      const confirmed = window.confirm('Are you sure you want to delete this agent?');
      if (!confirmed) return;

      try {
         await axios.delete(`http://localhost:8000/OrdinaryUsers/${agentId}`);
         setAgentList((prev) => prev.filter((agent) => agent._id !== agentId));
         alert('Agent deleted successfully');
      } catch (error) {
         console.error('Error deleting agent:', error);
         alert('Failed to delete agent. Please try again.');
      }
   };

   const handleToggle = (agentId) => {
      setToggle((prev) => ({ ...prev, [agentId]: !prev[agentId] }));
   };

   if (loading) {
      return (
         <div className="text-center my-5">
            <h4>Loading agents...</h4>
         </div>
      );
   }

   return (
      <>
         <div className="body">
            <Container>
               <Table striped bordered hover>
                  <thead>
                     <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {agentList.length > 0 ? (
                        agentList.map((agent) => {
                           const open = toggle[agent._id] || false;

                           return (
                              <tr key={agent._id}>
                                 <td>{agent.name}</td>
                                 <td>{agent.email}</td>
                                 <td>{agent.phone}</td>
                                 <td>
                                    <Button
                                       onClick={() => handleToggle(agent._id)}
                                       aria-controls={`collapse-${agent._id}`}
                                       aria-expanded={open}
                                       className="mx-2"
                                       variant="outline-warning"
                                    >
                                       Update
                                    </Button>
                                    <Collapse in={open}>
                                       <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(agent._id); }} className="p-3">
                                          <Form.Group className="mb-3" controlId="formName">
                                             <Form.Label>Full Name</Form.Label>
                                             <Form.Control
                                                type="text"
                                                name="name"
                                                value={updateAgent.name}
                                                onChange={handleChange}
                                                placeholder="Enter name"
                                             />
                                          </Form.Group>
                                          <Form.Group className="mb-3" controlId="formEmail">
                                             <Form.Label>Email address</Form.Label>
                                             <Form.Control
                                                type="email"
                                                name="email"
                                                value={updateAgent.email}
                                                onChange={handleChange}
                                                placeholder="Enter email"
                                             />
                                          </Form.Group>
                                          <Form.Group className="mb-3" controlId="formPhone">
                                             <Form.Label>Phone</Form.Label>
                                             <Form.Control
                                                type="tel"
                                                name="phone"
                                                value={updateAgent.phone}
                                                onChange={handleChange}
                                                placeholder="Enter phone number"
                                             />
                                          </Form.Group>
                                          <Button size="sm" variant="outline-success" type="submit">
                                             Submit
                                          </Button>
                                       </Form>
                                    </Collapse>
                                    <Button
                                       onClick={() => deleteUser(agent._id)}
                                       className="mx-2"
                                       variant="outline-danger"
                                    >
                                       Delete
                                    </Button>
                                 </td>
                              </tr>
                           );
                        })
                     ) : (
                        <tr>
                           <td colSpan="4" className="text-center">
                              <Alert variant="info">No agents to show</Alert>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </Table>
            </Container>
         </div>
         <Footer />
      </>
   );
};

export default AgentInfo;
