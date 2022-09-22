import { useState } from "react";
import AccountDetails from "../components/personalprofile/AccountDetails";
import NavbarProfile from "../components/personalprofile/NavbarProfile";
import SubmittedDeals from "../components/personalprofile/SubmittedDeals";
import Watchlist from "../components/personalprofile/Watchlist";
import background from "/src/images/pexels-anni-roenkae.jpg";

function PersonalProfile() {
  const [select, setSelect] = useState("AccountDetails");
  const [watchList, setWatchList] = useState({});

  return (
    <div
      style={{
        backgroundImage: `url("${background}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        objectFit: "fill",
        minHeight: "95vh",
      }}
    >
      <h1 className="font-semibold text-2xl ml-8 py-10">My Profile</h1>
      <div className="flex items-start ml-8">
        <NavbarProfile
          setSelect={setSelect}
          select={select}
          setWatchList={setWatchList}
        />

        <AccountDetails className="flex-wrap" select={select} />
        <SubmittedDeals className="flex-wrap" select={select} />
        <Watchlist
          className="flex-wrap"
          select={select}
          watchList={watchList}
        />
      </div>
    </div>
  );
}

export default PersonalProfile;
