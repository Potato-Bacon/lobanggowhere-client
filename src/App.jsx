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
import Page404 from "./pages/Page404";
import Logout from "./pages/Logout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/deals/:id" element={<DealDetails />} />
            <Route path="/account/:id" element={<PublicProfile />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/profile/:username" element={<PublicProfile />} />

            {/* Requires logged in account in order to access paths */}
            <Route element={<RequireAuth allowedRoles={["User"]} />}>
              <Route path="/submission" element={<Submission />} />
              <Route path="/account" element={<PersonalProfile />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={true}
          draggable={true}
          progress={undefined}
          pauseOnHover={true}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
