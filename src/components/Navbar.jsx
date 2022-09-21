import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    const text = e.target.innerText;
    if (text === "Home") {
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
    <div style={{ backgroundColor: "red", display: "flex" }}>
      <h3>Lobang go where</h3>
      <button onClick={handleNavigate}>Home</button>
      <button onClick={handleNavigate}>Admin</button>
      <button onClick={handleNavigate}>Profile</button>
      {user.userName ? (
        <button onClick={handleNavigate}>Logout</button>
      ) : (
        <button onClick={handleNavigate}>Login</button>
      )}
    </div>
  );
};
export default Navbar;
