import axios from "axios";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { SERVER } from "../utils/constants";

const RequireAuth = ({ allowedRoles }) => {
  const { auth, setAuth, user, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  //* Add a section to call an /auth server maybe to authenticate that user is admin, using token saved in auth (accesstoken)

  // const url = SERVER + "/authcheck";

  const accesscall = async () => {
    let response = await axios.get(SERVER + "/authcheck", {
      userName: user.userName,
      accessToken: auth,
    });
    switch (response.status) {
      case 403:
        //* Using refresh token
        try {
          response = await axios.get(SERVER + "/refresh", {
            withCredentials: true,
          });
          setUser(response.data?.payload.user);
          setAuth(response.data?.payload.accessToken);
        } catch (err) {
          //* Refresh token not working / no refresh token
          console.error("Refresh token error");
          navigate("/login", { state: { from: location }, replace: true });
          return;
        }
        break;
      case 401:
        //* Failure in general, states have been messed with
        console.error("States do not match, please log in");
        navigate("/login", { state: { from: location }, replace: true });
        break;
      case 200:
        // Success
        setUser(response.data?.payload.user);
        setAuth(response.data?.payload.accessToken);
    }
  };

  //* Calling API to validate user, redirect if wrong
  accesscall();
  const rolesCheck = user.roles;
  console.log(rolesCheck);

  //* Change auth.roles to check /auth call return (like auth?.token)
  //? How about it returns the object & assigned to rolesCheck: {roles: ["user", "admin"]}
  // auth?.roles?.find(role => allowedRoles?.includes(role))
  return rolesCheck?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user?.userName ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
