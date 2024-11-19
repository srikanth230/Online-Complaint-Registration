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

const UserInfo = () => {
   const navigate = useNavigate();
   const [userList, setUserList] = useState([]);
   const [loading, setLoading] = useState(true);
   const [toggle, setToggle] = useState({});
   const [updateUser, setUpdateUser] = useState({ name: '', email: '', phone: '' });

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const response = await axios.get('http://localhost:8000/OrdinaryUsers');
            setUserList(response.data);
         } catch (error) {
            console.error('Error fetching users:', error);
         } finally {
            setLoading(false);
         }
      };
      fetchUsers();
   }, [navigate]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdateUser((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (userId) => {
      const updates = Object.fromEntries(
         Object.entries(updateUser).filter(([_, value]) => value.trim())
      );

      if (Object.keys(updates).length === 0) {
         alert('Please fill at least one field to update.');
         return;
      }

      const confirmed = window.confirm('Are you sure you want to update this user?');
      if (!confirmed) return;

      try {
         await axios.put(`http://localhost:8000/user/${userId}`, updates);
         alert('User updated successfully');
         setUserList((prev) =>
            prev.map((user) => (user._id === userId ? { ...user, ...updates } : user))
         );
         setUpdateUser({ name: '', email: '', phone: '' });
         handleToggle(userId); // Close the form
      } catch (error) {
         console.error('Error updating user:', error);
         alert('Failed to update user. Please try again.');
      }
   };

   const deleteUser = async (userId) => {
      const confirmed = window.confirm('Are you sure you want to delete this user?');
      if (!confirmed) return;

      try {
         await axios.delete(`http://localhost:8000/OrdinaryUsers/${userId}`);
         setUserList((prev) => prev.filter((user) => user._id !== userId));
         alert('User deleted successfully');
      } catch (error) {
         console.error('Error deleting user:', error);
         alert('Failed to delete user. Please try again.');
      }
   };

   const handleToggle = (userId) => {
      setToggle((prev) => ({ ...prev, [userId]: !prev[userId] }));
   };

   if (loading) {
      return (
         <div className="text-center my-5">
            <h4>Loading users...</h4>
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
                     {userList.length > 0 ? (
                        userList.map((user) => {
                           const open = toggle[user._id] || false;

                           return (
                              <tr key={user._id}>
                                 <td>{user.name}</td>
                                 <td>{user.email}</td>
                                 <td>{user.phone}</td>
                                 <td>
                                    <Button
                                       onClick={() => handleToggle(user._id)}
                                       aria-controls={`collapse-${user._id}`}
                                       aria-expanded={open}
                                       className="mx-2"
                                       variant="outline-warning"
                                    >
                                       Update
                                    </Button>
                                    <Collapse in={open}>
                                       <Form
                                          onSubmit={(e) => {
                                             e.preventDefault();
                                             handleSubmit(user._id);
                                          }}
                                          className="p-3"
                                       >
                                          <Form.Group className="mb-3" controlId="formName">
                                             <Form.Label>Full Name</Form.Label>
                                             <Form.Control
                                                name="name"
                                                value={updateUser.name}
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="Enter name"
                                             />
                                          </Form.Group>
                                          <Form.Group className="mb-3" controlId="formEmail">
                                             <Form.Label>Email Address</Form.Label>
                                             <Form.Control
                                                name="email"
                                                value={updateUser.email}
                                                onChange={handleChange}
                                                type="email"
                                                placeholder="Enter email"
                                             />
                                          </Form.Group>
                                          <Form.Group className="mb-3" controlId="formPhone">
                                             <Form.Label>Phone</Form.Label>
                                             <Form.Control
                                                name="phone"
                                                value={updateUser.phone}
                                                onChange={handleChange}
                                                type="tel"
                                                placeholder="Enter phone number"
                                             />
                                          </Form.Group>
                                          <Button size="sm" variant="outline-success" type="submit">
                                             Submit
                                          </Button>
                                       </Form>
                                    </Collapse>
                                    <Button
                                       onClick={() => deleteUser(user._id)}
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
                              <Alert variant="info">No users to show</Alert>
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

export default UserInfo;
