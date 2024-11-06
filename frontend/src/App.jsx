// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Admin from './routes/Admin';
import Teacher from './routes/Teacher';
import Student from './routes/Student';
import Login from './pages/Login';
import CourseForm from './pages/admin/CourseForm';


function App() {
  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/*" element={<Admin />} />
        <Route path="/student/*" element={<Student />} />
        <Route path="/teacher/*" element={<Teacher />} />
        <Route path='/courseform'  element={<CourseForm/>} />
     
        
      </Routes>
    </>
  );
}

export default App;
        