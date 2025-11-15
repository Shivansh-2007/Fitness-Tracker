import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout.jsx";
import AuthLayout from "./Layouts/AuthLayout.jsx";
import DashboardLayout from "./Layouts/DashboardLayout.jsx";

import Home from './Pages/home.jsx';
import Login from './Pages/login.jsx';
import Register from './Pages/register.jsx';

import Profile from './Pages/profile.jsx';
import Progress from './Pages/progress.jsx';
import Users from './Pages/users.jsx';
import Dashboard from './Pages/dashboard.jsx';
import LogWorkout from './Pages/logWorkout.jsx';
import Workouts from './Pages/workouts.jsx';

export default function App() {
  return(
      <Routes>
        <Route element = {<MainLayout/>}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Route>

        <Route element = {<AuthLayout/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element = {<DashboardLayout/>}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/log-workout" element={<LogWorkout />} />
          <Route path="/workouts" element={<Workouts />} />
        </Route>
      </Routes>
  );
}