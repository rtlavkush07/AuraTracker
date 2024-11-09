// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Teacher from './routes/Teacher';
import Student from './routes/Student';
import Login from './pages/Login';
import Admin from './routes/Admin';


function App() {
  return (
    <>

      <div className='h-1/10'>
        <Navbar />
      </div>
      <div className='h-9/10'>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/admin/*" element={<Admin />} />
          <Route path="/student/*" element={<Student />} />
          <Route path="/teacher/*" element={<Teacher />} />


        </Routes>
      </div>

    </>
  );
}

export default App;
