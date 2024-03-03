import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({settoken}) => {
    const handlelogout=()=>{
        localStorage.removeItem("token")
        settoken("")
        alert("Logout Successfull!!")
    }
  return (
    <div style={{height:"100px",width:"100vw",border:"1px solid teal",backgroundColor:"teal",display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
      <Link style={{textDecoration:"none",color:"white"}} to="/">Home</Link>
      <Link style={{textDecoration:"none",color:"white"}} to="/signup">SignUp</Link>
      <Link style={{textDecoration:"none",color:"white"}} to="/login">Login</Link>
      <button style={{textDecoration:"none",color:"blue",backgroundColor:"skyblue",fontSize:"20px"}} onClick={handlelogout}>Logout</button>
    </div>
  )
}

export default Navbar
