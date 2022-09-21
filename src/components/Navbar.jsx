import { useNavigate } from "react-router-dom";
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
    if (text === "Profile") {
      return navigate("/account");
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
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">LobangGoWhere</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={handleNavigate} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a onClick={handleNavigate}>Admin</a>
              </li>
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
