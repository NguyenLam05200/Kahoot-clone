import React from "react";
import { HomeLayout } from "../../components/HomeLayout";
import { ProtectedLayout } from "../../components/ProtectedLayout";
import { PlayerPage } from "../../features/player/index";
import CreateListKahootQuestion from "../../features/create_kahoot/createKhut";

import Dashboard from "../../features/user/Dashboard";
import { HomePage } from "../landingPages/HomePage";
// import ListKahootRoom from "../../features/list kahoot room/ListKahootRoom";

import { Routes, Route } from "react-router-dom";
import { Container, Paper } from "@mui/material";
import Library from "../../features/list kahoot room/Library";
import GameHost from "../../features/hostGame/index";
import KahootDetail from "../../features/kahoot detail/kahoot_detail";
import { AuthLayout } from "../../components/AuthLayout";
import LoginForm from "../../features/user/LoginForm";
import SignupForm from "../../features/user/SignupForm";
import Report from "../../features/list kahoot room/Report";

function App() {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100vh",
      }}
    >
      <Routes>
        <Route path="/user" element={<ProtectedLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="home" element={<Dashboard />} />
          <Route path="library" element={<Library />} />
          <Route path="reports" element={<Report />} />
          <Route path="create">
            <Route path="kahut" element={<CreateListKahootQuestion />} />
          </Route>

          {/* http://localhost:3000/user/addKahutQuestion */}
          {/* <Route path="addKahutRoom" element={<ListKahootRoom />} /> */}
          <Route path="addKahutQuestion" element={<CreateListKahootQuestion />} />
          <Route path="kahootDetail/:roomID" element={<KahootDetail />} />
        </Route>

        <Route path="/user/gameHost" element={<GameHost />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Route>

        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route path="/play" element={<PlayerPage />} />
      </Routes>
    </Paper>
  );
}

export default App;
