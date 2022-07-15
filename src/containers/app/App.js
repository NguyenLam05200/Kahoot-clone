import React from "react";
import { HomeLayout } from "../../components/HomeLayout";
import { ProtectedLayout } from "../../components/ProtectedLayout";
import { PlayerPage } from "../../features/player/index";
import CreateListKahootQuestion from "../../features/create_kahoot/createKhut";

import Dashboard from "../../features/roomKahut/Dashboard";
import { HomePage } from "../landingPages/HomePage";
// import ListKahootRoom from "../../features/roomKahut/ListKahootRoom";

import { Routes, Route } from "react-router-dom";
import { Container, Paper } from "@mui/material";
import Library from "../../features/roomKahut/Library";
import GameHost from "../../features/hostGame/index";
import KahootDetail from "../../features/kahoot detail/kahoot_detail";
import { AuthLayout } from "../../components/AuthLayout";
import LoginForm from "../../features/user/LoginForm";
import SignupForm from "../../features/user/SignupForm";
import Report from "../../features/roomKahut/Report";
import Discover from "../../features/roomKahut/Discover";
import CreateKahut from "../../features/roomKahut/CreateKahut";
import Details from "../../features/roomKahut/Details";
import EditKhut from "../../features/edit kahoot/editKahoot";
import Edit from "../../features/roomKahut/Edit";
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
          <Route path="discover" element={<Discover />} />
          <Route path="details/:roomID" element={<Details />} />
          <Route path="edit/:roomID" element={<Edit />} />
          <Route path="create">
            <Route path="kahut" element={<CreateKahut />} />
          </Route>
          <Route path="editKahut/:idRoom" element={<EditKhut />} />
          {/* http://localhost:3000/user/addKahutQuestion */}
          {/* <Route path="addKahutRoom" element={<ListKahootRoom />} /> */}
          <Route path="addKahutQuestion" element={<CreateListKahootQuestion />} />
          <Route path="kahootDetail/:roomID" element={<KahootDetail />} />
        </Route>

        <Route path="/user/gameHost/:roomID" element={<GameHost />} />

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
