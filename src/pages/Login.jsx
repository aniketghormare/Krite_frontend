import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../components/baseurl';

const Login = ({settoken}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${baseURL}/api/auth/login`, formData);
           // console.log(response.data.msg);
           
            if(response.data.msg=="User not found 42"){
                alert("User Not Found Please SignUp First")
            }else{
                localStorage.setItem("token", response.data.token)
           
                alert("Login Success!!")
                settoken(localStorage.getItem("token"))
               
            }
            setFormData({
                email: '',
                password: ''
            })
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <>
            <br />
            <div style={{ textAlign: 'center', marginTop: '20px', border: "1px solid teal", width: "500px", margin: "auto" }}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="email" style={{ marginRight: '10px' }}>Email:</label>
                        <br /><input style={{padding:"5px"}} type="email" id="email" placeholder='email' name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="password" style={{ marginRight: '10px' }}>Password:</label>
                        <br /> <input style={{padding:"5px"}} type="password" placeholder='password' id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Login</button>
                    <br /></form>
            </div>
        </>
    );
};

export default Login;
