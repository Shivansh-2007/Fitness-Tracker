import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './Pages/home.jsx'
import Login from './Pages/login.jsx'
import Register from './Pages/register.jsx'
import Profile from './Pages/profile.jsx'
import Progress from './Pages/progress.jsx';
import Users from './Pages/users.jsx';
import Dashboard from './Pages/dashboard.jsx'
import LogWorkout from './Pages/logWorkout.jsx'
import Workouts from './Pages/workouts.jsx';
import "tailwindcss";


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/users" element={<Users />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/log-workout" element={<LogWorkout />} />
      <Route path="/workouts" element={<Workouts />} />
    </Routes>
  </BrowserRouter>
  
)
