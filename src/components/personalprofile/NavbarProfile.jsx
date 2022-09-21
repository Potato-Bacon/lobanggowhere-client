import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { SERVER } from "../../utils/constants";

function NavbarProfile({ setSelect, setWatchList }) {
  const { user } = useContext(AuthContext);
  const handleClick = async (options) => {
    if (options === "AccountDetails") {
      setSelect("AccountDetails");
    } else if (options === "SubmittedDeals") {
      setSelect("SubmittedDeals");
    } else if (options === "Watchlist") {
      setSelect("Watchlist");
      const watchList = user.watchList;
      const url = SERVER + `/account/watchlist`;
      const data = await axios.post(url, watchList);
      setWatchList(data);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div onClick={() => handleClick("AccountDetails")}>Account Details</div>
        <div
          onClick={() => {
            handleClick("SubmittedDeals");
          }}
        >
          Submitted Deals
        </div>
        <div onClick={() => handleClick("Watchlist")}>Watchlist</div>
      </div>
    </>
  );
}

export default NavbarProfile;
