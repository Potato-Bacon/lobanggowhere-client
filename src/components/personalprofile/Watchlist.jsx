import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

function Watchlist({ select }) {
  const { user } = useContext(AuthContext);

  return <>{select === "Watchlist" && <h1>Watch List</h1>}</>;
}

export default Watchlist;
