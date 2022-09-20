import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Layout from "./Layout";
import Admin from "./pages/Admin";
import DealDetails from "./pages/DealDetails";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import PersonalProfile from "./pages/PersonalProfile";
import PublicProfile from "./pages/PublicProfile";
import Registration from "./pages/Registration";
import Submission from "./pages/Submission";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const [publicProfile, setPublicProfile] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/deals/:id"
            element={<DealDetails setPublicProfile={setPublicProfile} />}
          />
          <Route path="/account/:id" element={<PublicProfile />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/profile/:username"
            element={<PublicProfile publicProfile={publicProfile} />}
          />

          {/* Requires logged in account in order to access paths */}
          <Route element={<RequireAuth allowedRoles={["User"]} />}>
            <Route path="/submission" element={<Submission />} />
            <Route path="/account" element={<PersonalProfile />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
