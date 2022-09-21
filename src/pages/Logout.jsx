import { toast } from "react-toastify";
import axios from "axios";
import { SERVER } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const Logout = () => {
  const { auth, user, setAuth, setUser } = useAuth();
  const url = SERVER + "/logout";
  const navigate = useNavigate();

  useEffect(() => {
    const logoutseq = async () => {
      console.log("Attempting Logout");
      const response = await axios.post(
        url,
        { userName: user.userName, accessToken: auth },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (!response) {
        console.error("States do not match, please log in");
        navigate("/login", { state: { from: location }, replace: true });
        toast.info("User not logged in");
        return;
      }
      setAuth("");
      setUser({});
      toast.info("Successfully Logged out");
      navigate("/");
    };
    logoutseq();
  }, []);

  return (
    <>
      <h1>Logout page</h1>
    </>
  );
};

export default Logout;
