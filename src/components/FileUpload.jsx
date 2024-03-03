import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from './baseurl';

function FileUpload({ fetchDomains, fetchdata,domains }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  //let count=0
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      //console.log("formData", formData)
      let token=localStorage.getItem("token")
      
      let res = await axios.post(`${baseURL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      if(domains.length!== +res.data.domains){
        alert('File uploaded successfully!!', res);
        fetchDomains()
        fetchdata()
       // count+= Number(res.data.domains)
      }else{
            alert("Domains Already Exist")
      }
    //console.log(res.data)
     
    } catch (error) {
     // console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };

  return (
    <div style={{height:"50px",width:"400px",border:"1px solid teal",margin:"auto",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <input type="file" onChange={handleFileChange} />
      <button style={{padding:"5px",backgroundColor:"teal",color:"white"}}  onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
