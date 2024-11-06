import React from 'react'
import { Route,Routes } from 'react-router-dom'
const Admin = () => {
  return (
    <>
     <Routes>
     
      
            
      <Route path="dashboard" element={<Dashboard />} />
      {/* <Route path="profile" element={<Profile />} /> */}
      {/* <Route path="store" element={<Store />} /> */}
      
      
      
            

    </Routes>
    </>
  )
}

export default Admin
