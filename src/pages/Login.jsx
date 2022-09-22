import { useState, useEffect, useRef, useContext } from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER } from "../utils/constants";
import { toast } from "react-toastify";

const Login = () => {
  const { setAuth, setUser } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userName, password]);

  const url = SERVER + "/login";

  const handleSubmit = async (e) => {
    console.log("Submitting form");
    console.log({ userName, password });
    e.preventDefault();

    try {
      const response = await axios.post(
        url,
        { userName, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data?.payload.user);
      const token = response.data?.payload.accessToken;
      setAuth(token);
      setUser(response.data?.payload.user);
      setUserName("");
      setPassword("");
      navigate(from, { replace: true });
      toast.info(
        <p style={{ lineHeight: 1, margin: "0 auto" }}>
          Login Successful
          <br />
          Welcome back {userName}
        </p>
      );
    } catch (err) {
      console.log("Error here");
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="text-center">
      <div className="flex items-center card w-96 h-100 bg-base-100 shadow-xl text-center ">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <form onSubmit={handleSubmit} className={"mt-11"}>
          <div className="flex items-center justify-center">
            <label htmlFor="userName" className="card-body text-xl m-0 pr-2">
              Username:{" "}
            </label>
            <input
              type="text"
              id="userName"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
              placeholder="Enter username ..."
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="flex items-center justify-center">
            <label htmlFor="password" className="card-body text-xl m-0 pr-4">
              Password:{" "}
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              placeholder="Enter password ..."
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <button className="btn btn-primary mt-1.5">Sign In</button>
        </form>
        <p className="card-body pb-0.5">
          Need an Account?
          <br />
          <span
            onClick={() => {
              console.log("Navigating to register");
              navigate("/register");
            }}
            className="card-body underline pt-1.5 mb-3.5"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
