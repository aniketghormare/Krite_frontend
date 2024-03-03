import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from './baseurl';

function DomainForm({onDomainAdded,fetchdata}) {
  const [name, setName] = useState('');
  const [type, setType] = useState(''); // Add state for domain type
  let token=localStorage.getItem("token")
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const headers = {
        'Authorization': `Bearer ${token}`
      };
  
      await axios.post(`${baseURL}/api/domains`, { name, type }, { headers });
      alert('Domain added successfully!');
      setName('');
      setType(''); // Clear the type input after submission
      onDomainAdded()
      fetchdata()
      
    } catch (error) {
      console.error('Error adding domain:', error);
    }
  };
  const fetchDomains = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/domains`);
      //console.log('Domains:', response.data);
      //setFilter(response.data)
      // Handle the response (update state, etc.)
    } catch (error) {
      console.error('Error fetching domains:', error);
    }
  };

  return (
    <div style={{height:"auto",width:"400px",border:"1px solid teal",margin:"auto"}}>
      <h2 style={{color:"teal"}}>Add Domain</h2>
      <form onSubmit={handleSubmit}>
        <br />
        <label htmlFor="">Domain Name</label>
        <br />
        <input
         style={{padding:"3px",fontSize:"14px"}}
          type="text"
          placeholder="Domain Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="">Domain Type</label>
        <br />
        <input
        style={{padding:"3px",fontSize:"14px"}}
          type="text"
          placeholder="Domain Type" // Add input for domain type
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <br />
        <br />
        <button style={{padding:"5px",backgroundColor:"teal",color:"white"}} type="submit">Add Domain</button>
      <br /><br />
      </form>
    </div>
  );
}

export default DomainForm;
