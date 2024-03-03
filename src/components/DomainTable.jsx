import axios from 'axios';
import React, { useState } from 'react';
import { baseURL } from './baseurl';

function DomainTable({ domains, onDelete, onFilter,fetchDomains,fetchdata }) {
    const [singledata, setsingledata] = useState({})
    const [showModal, setShowModal] = useState(false);
    //const [newTask, setNewTask] = useState({ name: '', type: '' });

    const handleAddTask = async (id) => {
        try {
            let token=localStorage.getItem("token")
            const headers = {
                'Authorization': `Bearer ${token}`
              };
          
            let data={
                name:singledata.name,
                type:singledata.type
            }
            //console.log(data,id)
            const response = await axios.patch(`${baseURL}/api/domains/${id}`, data, {headers});
            //console.log(response);
            fetchDomains()
            fetchdata()
            setShowModal(false); // Close modal after successful update
        } catch (error) {
            console.error('Error updating domain:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    const handleedit = async (id) => {
        setShowModal(true)
        try {
            let token=localStorage.getItem("token")
            const headers = {
                'Authorization': `Bearer ${token}`
              };
            const response = await axios.get(`${baseURL}/api/domains/${id}`,{headers});
           // console.log(response.data)
            setsingledata(response.data[0])
            // setDomains(response.data);
            // setFilteredDomains(response.data);
        } catch (error) {
            console.error('Error fetching domains:', error);
        }
    }
    const handlechange = (e) => {
        const { name, value } = e.target;
        setsingledata((pre) => {
          return { ...pre, [name]: value }
        })
      }
    return (
        <>
        <br />
            <div style={{height:"auto",width:"auto",border:"1px solid white",margin:"auto"}}>
                <h2 style={{color:"teal"}}>Domain Table</h2>
                <input
                    style={{padding:"5px",fontSize:"16px"}}
                    type="text"
                    placeholder="Filter by name..."
                    onChange={(e) => onFilter(e.target.value)}
                />
                <br /><br />
                <div style={{ width: "500px", margin: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid teal" }}>
                        <thead>
                            <tr>
                                <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", backgroundColor: "#f2f2f2" }}>Name</th>
                                <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", backgroundColor: "#f2f2f2" }}>Action</th>
                                <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd", backgroundColor: "#f2f2f2" }}>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {domains.length>0 && domains.map(domain => (
                                <tr key={domain._id}>
                                    <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{domain.name}</td>
                                    <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>
                                        <button style={{ backgroundColor: "#ff4d4f", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }} onClick={() => onDelete(domain._id)}>Delete</button>
                                    </td>
                                    <td style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>
                                        <button style={{ backgroundColor: "teal", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }} onClick={() => handleedit(domain._id)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                </div>
            </div>
            {showModal && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1 }}>
                    <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "5px", width: "400px", height: "400px" }}>
                        <h2>Edit Domain</h2>
                        <label htmlFor="">Name</label>
                        <br />
                        <input style={{ padding: "5px" }} type="text" placeholder="name" name='name' value={singledata.name} onChange={handlechange}  />
                        <br />
                        <label htmlFor="">Type</label>
                        <br />

                        <input style={{ padding: "5px" }} type="text" placeholder="type" name='type' value={singledata.type} onChange={handlechange} />
                        <br />
                        {/* <label htmlFor="">DueDate</label> */}

                        {/* <br />
                        <input style={{ padding: "5px" }} type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
                        <br /> */}
                        <br />
                        <button style={{ backgroundColor: "#fff", padding: "8px", borderRadius: "5px", backgroundColor: "teal", color: "white" }} onClick={()=>handleAddTask(singledata._id)}>Add Task</button>
                        <br />
                        <br />
                        <button style={{ backgroundColor: "#fff", padding: "8px", borderRadius: "5px", backgroundColor: "teal", color: "white" }} onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
          
        </>
    );
}

export default DomainTable;
