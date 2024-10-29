// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthRoutes from './routes/AuthRoutes';
import Navbar from './components/Navbar';
import DashBoard from './pages/DashBoard';
import Profile from './pages/Profile';
import Store from './pages/Store';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </>
  );
}

export default App;
        