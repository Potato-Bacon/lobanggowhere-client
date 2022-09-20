import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { SERVER } from "../utils/constants";

const accesscall = async () => {
  const { auth, setAuth, user, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  let response = await axios
    .post(SERVER + "/authcheck", {
      userName: user.userName,
      accessToken: auth,
    })
    .catch((err) => {
      console.log("Handling error from axios");
      const errorhandling = async () => {
        switch (err.response.status) {
          case 403:
            //* Using refresh token
            console.log("Client caught error 403 and trying");
            try {
              response = await axios.get(SERVER + "/refresh", {
                withCredentials: true,
              });
              setUser(response.data?.payload.user);
              setAuth(response.data?.payload.accessToken);
              console.log(
                `Client got access token back: ${response.data?.payload.accessToken}`
              );
            } catch (err) {
              //* Refresh token not working / no refresh token
              console.error("Refresh token error");
              navigate("/login", {
                state: { from: location },
                replace: true,
              });
              return;
            }
            break;
          case 401:
            console.log("Client caught error 401 and rerouting");
            //* Failure in general, states have been messed with
            console.error("States do not match, please log in");
            navigate("/login", { state: { from: location }, replace: true });
            break;
        }
      };
      errorhandling();
    });
  // Success check
  if (response?.data?.payload?.user) {
    console.log("Client 200 got user data using accessToken");
    setUser(response.data?.payload.user);
  }
};

export default accesscall;
