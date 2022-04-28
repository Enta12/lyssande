import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Layout from "./components/layout";
import Login from "./pages/login/login";
import Pj from "./pages/pj/pj";


function AppRoute() {
  return (
      <Router>
          <Routes>
              <Route path="/pj" element={<Layout><Pj /></Layout>} />
              <Route path="/" element={<Login />} />
          </Routes>
      </Router>
  );
}

export default AppRoute;