import { useState, useEffect } from "react";
import AccountDetails from "../components/personalprofile/AccountDetails";
import NavbarProfile from "../components/personalprofile/NavbarProfile";
import SubmittedDeals from "../components/personalprofile/SubmittedDeals";
import Watchlist from "../components/personalprofile/Watchlist";

function PersonalProfile() {
  const [select, setSelect] = useState("AccountDetails");
  const [watchList, setWatchList] = useState({});

  return (
    <>
      <h1>PersonalProfile</h1>

      <NavbarProfile
        setSelect={setSelect}
        select={select}
        setWatchList={setWatchList}
      />

      <AccountDetails select={select} />
      <SubmittedDeals select={select} />
      <Watchlist select={select} watchList={watchList} />
    </>
  );
}

export default PersonalProfile;
