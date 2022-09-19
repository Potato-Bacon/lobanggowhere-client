import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Layout from "./Layout";
import Admin from "./pages/Admin";
import DealDetails from "./pages/DealDetails";
import Homepage from "./pages/Homepage";
import TempLogin from "./pages/TempLogin";
import PersonalProfile from "./pages/PersonalProfile";
import PublicProfile from "./pages/PublicProfile";
import Registration from "./pages/Registration";
import Submission from "./pages/Submission";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const handleClick = async () => {
    // const url = "http://localhost:3100";
    // const request = await fetch(url);
    // const data = await request.json();
    // console.log(data);

    const url = "http://localhost:3100";
    const response = await axios.get(url);
    console.log(response.data);

    // axios
    //   .get("http://localhost:3100")
    //   .then((response) => console.log(response.data));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<TempLogin />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/deals/:id" element={<DealDetails />} />
          <Route path="/account/:id" element={<PublicProfile />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Requires logged in account in order to access paths */}
          {/* <Route element={<RequireAuth allowedRoles={["User"]} />}> */}
          <Route path="/submission" element={<Submission />} />
          <Route path="/account" element={<PersonalProfile />} />
          {/* </Route> */}
          <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
