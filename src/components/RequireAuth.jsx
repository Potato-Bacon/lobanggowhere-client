import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth, user } = useAuth();
  const location = useLocation();

  //! Vid stores user role in client side... risk potential - Do it differently
  //* Add a section to call an /auth server maybe to authenticate that user is admin, using token saved in auth (accesstoken)
  //? Refresh token is somewhere ??? In a cookie (Not sure)

  //* Temp auth const (Call API and return roles based on user)
  const rolesCheck = { roles: [] };

  //* Change auth.roles to check /auth call return (like auth?.token)
  //? How about it returns the object & assigned to rolesCheck: {roles: ["user", "admin"]}
  // auth?.roles?.find(role => allowedRoles?.includes(role))
  return rolesCheck?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user?.userName ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
