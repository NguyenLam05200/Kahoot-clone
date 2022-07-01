import React from "react";
import { Counter } from "../../features/counter/Counter";
import { HomeLayout } from "../../components/HomeLayout";
import { ProtectedLayout } from "../../components/ProtectedLayout";
import Login from "../../features/user/Login";
import Signup from "../../features/user/Signup";
import { PlayerPage } from "../../features/player/index";
import CreateListKahootQuestion from "../../features/create_kahoot/createKhut";

import Dashboard from "../../features/user/Dashboard";
import CreateKahut from "../../features/create_kahoot/CreateKahut";
import { HomePage } from "../landingPages/HomePage";
import ListKahootRoom from "../../features/list kahoot room/ListKahootRoom";

import { Routes, Route } from "react-router-dom";
import { Container, Paper } from "@mui/material";
import Library from "../../features/list kahoot room/Library";
import GameHost from "../../features/hostGame/index";
import KahootDetail from "../../features/kahoot detail/kahoot_detail";

function App() {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100vh",
      }}
    >
      {/* <div className="App"> */}
      {/* <header className="App-header"> */}
      {/* <Counter /> */}
      <Routes>
        <Route path="/user">
          <Route path="home" element={<Dashboard />} />{" "}
          {/** url: localhost:3000/user/home */}
          <Route path="library" element={<Library />} />
          <Route path="create">
            <Route path="kahut" element={<CreateListKahootQuestion />} />{" "}
            {/** url: localhost:3000/user/create/kahut */}
          </Route>
          <Route path="gameHost" element={<GameHost />} />{" "}
          {/** url: localhost:3000/user/home */}
        </Route>

        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="/play" element={<PlayerPage />} />
        <Route path="/addKahutRoom" element={<ListKahootRoom />} />
        <Route
          path="/addKahutQuestion"
          element={<CreateListKahootQuestion />}
        />
        <Route path="KahootDetail" element={<KahootDetail />} />

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
