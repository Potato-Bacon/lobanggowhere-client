import { useState, useEffect, useRef, useContext } from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER } from "../utils/constants";
import AuthContext from "../context/AuthProvider";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const { setAuth } = useAuth();
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
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">Username: </label>
        <input
          type="text"
          id="userName"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          required
        />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button>Sign In</button>
      </form>
      <p>
        Need an Account?
        <br />
        <span
          style={{ textDecoration: "Underline" }}
          onClick={() => {
            console.log("Navigating to register");
            navigate("/register");
          }}
        >
          Sign Up
        </span>
      </p>
    </section>
  );
};

export default Login;
