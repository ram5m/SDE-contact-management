import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });

  // Fetch contacts from backend
  useEffect(() => {
    axios.get('http://localhost:5000/contacts')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the contacts!', error);
      });
  }, []);

  // Handle form data input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/contacts', formData)
      .then(response => {
        setContacts([...contacts, response.data]);
        setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', company: '', jobTitle: '' });
      })
      .catch(error => {
        console.error('There was an error creating the contact!', error);
      });
  };

  return (
    <div>
      <h1>Contact Management</h1>

      {/* Contact Form */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Job Title"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          fullWidth
          required
        />
        <Button type="submit">Add Contact</Button>
      </form>

      {/* Contacts Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map(contact => (
              <TableRow key={contact._id}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phoneNumber}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
