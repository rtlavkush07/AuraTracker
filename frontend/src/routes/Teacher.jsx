import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TeacherDashboard from '../pages/teacher/TeacherDashboard'
import TeacherProfile from '../pages/teacher/TeacherProfile'
import AddAssignment from '../pages/teacher/AddAssignment'
import AddMaterial from '../pages/teacher/AddMaterial'

const Teacher = () => {
  return (
    <div>
      <Routes>
        <Route path="" element= {<TeacherDashboard />} />
        <Route path="/profile" element  = {<TeacherProfile/>}/>
        <Route path="/assignment" element  = {<AddAssignment/>}/>
        <Route path="/addmaterials" element  = {<AddMaterial/>}/>
      </Routes>
    </div>
  )
}

export default Teacher
