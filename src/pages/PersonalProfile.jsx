import { useState } from "react";
import AccountDetails from "../components/personalprofile/AccountDetails";
import NavbarProfile from "../components/personalprofile/NavbarProfile";
import SubmittedDeals from "../components/personalprofile/SubmittedDeals";
import Watchlist from "../components/personalprofile/Watchlist";

function PersonalProfile() {
  const [select, setSelect] = useState("AccountDetails");
  const [watchList, setWatchList] = useState({});

  return (
    <>
      <div className="font-semibold">My Profile</div>
      <div className="flex">
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
    </>
  );
}

export default PersonalProfile;
