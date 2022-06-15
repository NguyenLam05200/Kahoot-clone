import React from "react";
import { Counter } from "../../features/counter/Counter";
import { HomeLayout } from "../../components/HomeLayout";
import { ProtectedLayout } from "../../components/ProtectedLayout";
import { HomePage } from "../homepage/HomePage";
import Login from "../../features/user/Login";
import Signup from "../../features/user/Signup";
import { PlayerPage } from "../../features/player/Player";
import CreateKhutRoom from "../../features/create_kahoot/createKhut";

import { Routes, Route } from "react-router-dom";
import { Container, Paper } from "@mui/material";

function App() {
  return (
    <Paper elevation={0}>
      {/* <div className="App"> */}
      {/* <header className="App-header"> */}
      {/* <Counter /> */}
      <Routes>
        <Route path='/user/home' element={<Dashboard />} />
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="/play" element={<PlayerPage />} />
        <Route path="/addKahut" element={<CreateKhutRoom />} />
        <Route path="/kahut.it" element={<PlayerPage />} />

        <Route path="/dashboard" element={<ProtectedLayout />}>
          {/* vi du: localhost:3000/dashboard/profile -> isLoggedIn ? render(ProfilePag) : Navigate '/login' */}
          {/* <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} /> */}
        </Route>
      </Routes>
      {/* </header> */}
      {/* </div> */}
    </Paper>
  );
}

export default App;
