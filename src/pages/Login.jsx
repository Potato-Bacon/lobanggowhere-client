import { useState, useEffect, useRef, useContext } from "react";
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
        minHeight: "95vh",
        backgroundImage: `url("${background}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        objectFit: "fill",
      }}
    >
      <div className="flex-col flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6">
        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Welcome to LobangGoWhere 💸
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500 w-96">
          Ut eros ante, blandit vel tincidunt at, tristique ut turpis. Donec
          elit ligula, suscipit id magna sed, fermentum dictum ex
        </p>
        <div className="flex justify-center ">
          <div className="flex items-center card w-96 h-100 bg-base-100 text-center ">
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
                  className="block text-lg font-medium text-gray-700 pr-1"
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
                  className="pl-2 w-full mt-1 h-8 text-base text-gray-700 bg-white border-gray-200 rounded-md shadow-sm"
                />
              </div>
              <div className="flex items-center justify-center py-4">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-gray-700 pr-1"
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
                  className="pl-2 w-full mt-1 h-8 text-base text-gray-700 bg-white border-gray-200 rounded-md shadow-sm"
                />
              </div>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4 mt-3">
                <button className="inline-block px-12 py-3 text-sm font-medium text-white bg-primary border border-primary transition rounded-md shrink-0 hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-primary">
                  Sign In
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Need an Account?
                </p>
                <p
                  onClick={() => {
                    console.log("Navigating to register");
                    navigate("/register");
                  }}
                  className="text-gray-700 underline "
                >
                  Sign Up
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
