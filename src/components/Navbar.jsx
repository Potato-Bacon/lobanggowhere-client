import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
const Navbar = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    const text = e.target.innerText;
    if (text === "Home" || text === "Logout") {
      return navigate("/");
    }
    if (text === "Admin") {
      return navigate("/admin");
    }
    if (text === "Profile") {
      return navigate("/login");
    }
    if (text === "Login") {
      return navigate("/login");
    }
  };
  return (
    <div style={{ backgroundColor: "red", display: "flex" }}>
      <h3>Lobang go where</h3>
      <button onClick={handleNavigate}>Home</button>
      <button onClick={handleNavigate}>Admin</button>
      <button onClick={handleNavigate}>Profile</button>
      {auth?.user ? (
        <button onClick={handleNavigate}>Logout</button>
      ) : (
        <button onClick={handleNavigate}>Login</button>
      )}
    </div>
  );
};
export default Navbar;
