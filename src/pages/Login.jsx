import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER } from "../utils/constants";
import { toast } from "react-toastify";
import background from "/src/images/pexels-anni-roenkae.jpg";

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
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url("${background}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        objectFit: "fill",
      }}
    >
      <div
        style={{
          padding: "10rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="my-10 flex-col flex items-center justify-center bg-white bg-opacity-20 backdrop-blur-md px-8 py-6 rounded-xl drop-shadow-lg shadow-2xl sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6">
          <h1 className="mt-6 text-2xl font-bold text-black sm:text-3xl md:text-4xl">
            Welcome to LobangGoWhere 💸
          </h1>

          <div className="flex justify-center ">
            <div className="flex items-center card w-96 h-100  text-center ">
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <form onSubmit={handleSubmit} className={"mt-8"}>
                <div className="flex items-center justify-center">
                  <label
                    htmlFor="userName"
                    className="block text-lg font-medium text-black pr-1"
                  >
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
                    className="pl-2 w-full mt-1 h-8 text-base text-black bg-white rounded-xl drop-shadow-lg bg-opacity-20 backdrop-blur-md"
                  />
                </div>
                <div className="flex items-center justify-center py-4">
                  <label
                    htmlFor="password"
                    className="block text-lg font-medium text-black pr-1"
                  >
                    Password:{" "}
                  </label>
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    placeholder="Enter password ..."
                    className="pl-2 w-full mt-1 h-8 text-base text-black  bg-white rounded-xl drop-shadow-lg bg-opacity-20 backdrop-blur-md"
                  />
                </div>
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4 mt-3">
                  <button className="inline-block px-12 py-3 text-sm font-medium text-white bg-primary border border-primary transition rounded-md shrink-0 hover:bg-error hover:text-white focus:outline-none focus:ring active:text-primary">
                    Sign In
                  </button>

                  <p className="mt-4 text-sm text-black sm:mt-0">
                    Need an Account?
                  </p>
                  <p
                    onClick={() => {
                      console.log("Navigating to register");
                      navigate("/register");
                    }}
                    className="text-black underline "
                  >
                    Sign Up
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
