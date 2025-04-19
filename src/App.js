import "./App.css";

import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { Router, Route, Routes } from "react-router-dom";

import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LayoutDefault from "./components/LayoutDefault";

const App = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutDefault />}>
          <Route path="users/:userId" element={<UserDetail />} />
          <Route path="photos/:userId" element={<UserPhotos />} />
          <Route path="users" element={<UserList />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
