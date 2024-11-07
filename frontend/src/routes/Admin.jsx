import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddCourse from '../pages/admin/AddCourse'
// import AdminDashboard from '../pages/admin/AdminDashboard'
import AddSubject from '../pages/admin/AddSubject'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AddTeacher from '../pages/admin/AddTeacher'
const Admin = () => {
  return (
    <>
      <Routes>



        <Route path="/" element={<AdminDashboard />} />
        <Route path="addcourse" element={<AddCourse />} />
        <Route path="addsubject" element={<AddSubject />} />
        <Route path="addteacher" element={<AddTeacher />} />






      </Routes>
    </>
  )
}

export default Admin
