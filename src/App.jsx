import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import DealDetails from "./pages/DealDetails";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import PersonalProfile from "./pages/PersonalProfile";
import PublicProfile from "./pages/PublicProfile";
import Registration from "./pages/Registration";
import Submission from "./pages/Submission";

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
        <Route path="/" element={<Homepage />} />
        <Route path="/submission" element={<Submission />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/deals/:id" element={<DealDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/account" element={<PersonalProfile />} />
        <Route path="/account/:id" element={<PublicProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
