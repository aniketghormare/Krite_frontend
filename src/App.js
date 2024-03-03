
import './App.css';

import Navbar from './components/Navbar';
import AllRoutes from './components/AllRoutes';
import { useState } from 'react';


function App() {
  const [token,settoken]=useState(localStorage.getItem("token"))
  return (
    <div style={{ height: "auto", width: "100vw", border: "1px solid white",fontSize:"20px" }}>
      <Navbar settoken={settoken}/>
      <AllRoutes token={token} settoken={settoken}/>
    </div>
  );
}

export default App;
