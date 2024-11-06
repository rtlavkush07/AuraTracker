import React from 'react'
import { Route,Routes } from 'react-router-dom'
import AddCourse from '../pages/admin/AddCourse'
import AdminDashboard from '../pages/admin/AdminDashboard'
const Admin = () => {
  return (
    <>
     <Routes>
     
      
            
      <Route path="/" element={<AdminDashboard />} />
      <Route path="addcourse" element={<AddCourse />} />
     
      
      
      
            

    </Routes>
    </>
  )
}

export default Admin
