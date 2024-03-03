import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../components/baseurl';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
              console.log(formData)
        try {
            const response = await axios.post(`${baseURL}/api/auth/signup`, formData);
            console.log(response.data);
            alert("User Registered")
            setFormData({
                name: '',
                email: '',
                password: ''
            })
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <><br />
            <div style={{ textAlign: 'center', marginTop: '20px', border: "1px solid teal", width: "500px", margin: "auto" }}>
                <h2>Signup</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="name" style={{ marginRight: '10px' }}>Name:</label>
                        <br /> <input type="text" id="name" style={{padding:"5px"}} name="name" placeholder='name' value={formData.name} onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="email" style={{ marginRight: '10px' }}>Email:</label>
                        <br /> <input type="email" id="email" style={{padding:"5px"}} name="email" placeholder='email' value={formData.email} onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="password" style={{ marginRight: '10px' }}>Password:</label>
                        <br />  <input type="password" id="password" style={{padding:"5px"}} name="password" placeholder='password' value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Signup</button>
                    <br /></form>
            </div>
        </>
    );
};

export default Signup;
