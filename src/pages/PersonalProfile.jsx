import { useState, useEffect } from "react";
import AccountDetails from "../components/personalprofile/AccountDetails";
import NavbarProfile from "../components/personalprofile/NavbarProfile";
import SubmittedDeals from "../components/personalprofile/SubmittedDeals";
import Watchlist from "../components/personalprofile/Watchlist";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { SERVER } from "../utils/constants";

function PersonalProfile() {
  const [select, setSelect] = useState("");

  // const axiosPrivate = useAxiosPrivate();
  // const navigate = useNavigate();
  // const location = useLocation();

  const { setAuth, setUser, user } = useAuth();
  const url = SERVER + "/refresh";

  useEffect(
    () => {
      const callrefresh = async () => {
        const response = await axios.post(
          url,
          { userName: user.userName },
          {
            withCredentials: true,
          }
        );

        console.log(response.data.user);
        console.log(response.data.accessToken);
        setUser(response?.data?.user);
        setAuth(response.data.accessToken);
      };
      console.log("Calling refresh once");
      callrefresh();
    },
    // let isMounted = true;
    // const controller = new AbortController();

    // const getUsers = async () => {
    //   try {
    //     console.log("trying this right? 1");
    //     const response = await axiosPrivate.get("/account", {
    //       signal: controller.signal,
    //     });
    //     console.log("trying this right? 3");
    //     console.log(response.data);
    //     isMounted && console.log(response);
    //   } catch (err) {
    //     console.error(err);
    //     navigate("/login", { state: { from: location }, replace: true });
    //   }
    // };

    // getUsers();

    // return () => {
    //   isMounted = false;
    //   controller.abort();
    // };
    []
  );

  return (
    <>
      <h1>PersonalProfile</h1>

      <NavbarProfile setSelect={setSelect} />

      <AccountDetails select={select} />
      <SubmittedDeals select={select} />
      <Watchlist select={select} />
    </>
  );
}

export default PersonalProfile;
