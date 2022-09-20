import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { SERVER } from "../../utils/constants";

function NavbarProfile({ setSelect }) {
  const { user } = useContext(AuthContext);
  const handleClick = async (options) => {
    if (options === "AccountDetails") {
      setSelect("AccountDetails");
    } else if (options === "SubmittedDeals") {
      setSelect("SubmittedDeals");
      const submissions = user.submissions;
      console.log(submissions);
      const url = SERVER + `/account/submitteddeals/${submissions}`;
      const data = await axios.get(url);
      console.log(data);
    } else if (options === "Watchlist") {
      setSelect("Watchlist");
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
