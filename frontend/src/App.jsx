// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Teacher from './routes/Teacher';
import Student from './routes/Student';
import Login from './pages/Login';
import Admin from './routes/Admin';
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'


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
  <Route path="/about" element={<AboutUs />} />
<Route path="/contact" element={<ContactUs />} />

      </Routes>


    </>
  );
}

export default App;
