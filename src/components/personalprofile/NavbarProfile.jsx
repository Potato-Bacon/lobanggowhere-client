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
      <ul className="menu w-56 p-2 shadow-2xl bg-white bg-opacity-20 backdrop-blur-md rounded-xl drop-shadow-lg">
        <li className="m-8">
          <a
            className="font-serif font-bold underline"
            onClick={() => handleClick("AccountDetails")}
          >
            Account Details
          </a>
        </li>
        <li className="m-8">
          <a
            className="font-serif font-bold underline"
            onClick={() => {
              handleClick("SubmittedDeals");
            }}
          >
            Submitted Deals
          </a>
        </li>
        <li className="m-8">
          <a
            className="font-serif font-bold underline"
            onClick={() => handleClick("Watchlist")}
          >
            Watchlist
          </a>
        </li>
      </ul>

      {/* <div
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
      </div> */}
    </>
  );
}

export default NavbarProfile;
