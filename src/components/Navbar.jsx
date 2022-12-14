import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    const text = e.target.innerText;
    if (text === "LobangGoWhere") {
      return navigate("/");
    }
    if (text === "Admin") {
      return navigate("/admin");
    }

    if (text === "Login") {
      return navigate("/login");
    }
    if (text === "Logout") {
      return navigate("/logout");
    }
  };

  return (
    <>
      {/* <div style={{ backgroundColor: "red", display: "flex" }}>
        <h3>Lobang go where</h3>
        <button onClick={handleNavigate}>Home</button>
        <button onClick={handleNavigate}>Admin</button>
        <button onClick={handleNavigate}>Profile</button>
        {user.userName ? (
          <button onClick={handleNavigate}>Logout</button>
        ) : (
          <button onClick={handleNavigate}>Login</button>
        )}
      </div> */}
      <div style={{ minHeight: "5vh" }} className="navbar bg-primary fixed z-20">
        <div className="flex-1 text-white">
          <a
            onClick={handleNavigate}
            className="btn btn-ghost normal-case text-2xl font-extrabold"
            style={{ fontFamily: "ShadowsIntoLight" }}
          >
            LobangGoWhere
          </a>
        </div>
        <div className="flex-none gap-2 mr-3">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 font-bold font-sans"
            >
              <li>
                <Link to={`/account`} className="justify-between">
                  Profile
                  {/* <span className="badge">New</span> */}
                </Link>
              </li>
              {user?.roles?.includes("Admin") && (
                <li>
                  <a onClick={handleNavigate}>Admin</a>
                </li>
              )}
              <li>
                {user.userName ? (
                  <a onClick={handleNavigate}>Logout</a>
                ) : (
                  <a onClick={handleNavigate}>Login</a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
