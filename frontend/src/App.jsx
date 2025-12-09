import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; // The new CSS file we created above

// Import your views
import Home from './views/home/Home';
import Appointments from './views/appointments/Appointments';
import Services from './views/services/Services';
import Login from './views/login/Login';
import FindDoctor from './views/find doctor/FindDoctor';
import DoctorDetail from './views/doctor detail/DoctorDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/services" element={<Services />} />
        <Route path="/find-doctor" element={<FindDoctor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor-detail/:id" element={<DoctorDetail />} />
        {/* You can route /register to Login as well since it handles both states */}
        <Route path="/register" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;