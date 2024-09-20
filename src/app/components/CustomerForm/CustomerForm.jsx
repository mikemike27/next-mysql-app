'use client';

import { useState } from 'react';

export default function CustomerForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    emailAddress: '',
    phoneNumber: '',
    address: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Customer added successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          emailAddress: '',
          phoneNumber: '',
          address: '',
        });
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('An error occurred while adding the customer.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email Address</label>
        <input
          type="email"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Customer</button>
      {message && <p>{message}</p>}
    </form>
  );
}
