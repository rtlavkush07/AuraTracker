import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TeacherDashboard from '../pages/teacher/TeacherDashboard'
import TeacherProfile from '../pages/teacher/TeacherProfile'

const Teacher = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<TeacherDashboard />} />
        <Route path="/profile" element={<TeacherProfile />} />
        
      </Routes>
    </div>
  )
}

export default Teacher