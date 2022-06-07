import React from 'react';
import { Counter } from '../../features/counter/Counter';
import './App.css';
import { HomeLayout } from '../../components/HomeLayout';
import { ProtectedLayout } from '../../components/ProtectedLayout';
import { HomePage } from '../homepage/HomePage';
import { ProfilePage, SettingsPage } from '../dashboard/Dashboard';
import { LoginPage } from '../auth/login/Login';

import {
  Routes,
  Route,
} from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Counter /> */}
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route path="/dashboard" element={<ProtectedLayout />}>
            {/* vi du: localhost:3000/dashboard/profile -> isLoggedIn ? render(ProfilePag) : Navigate '/login' */}
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;