import { useState, useEffect } from "react";
import AccountDetails from "../components/personalprofile/AccountDetails";
import NavbarProfile from "../components/personalprofile/NavbarProfile";
import SubmittedDeals from "../components/personalprofile/SubmittedDeals";
import Watchlist from "../components/personalprofile/Watchlist";

function PersonalProfile() {
  const [select, setSelect] = useState("");
  const [submittedDeals, setSubmittedDeals] = useState({});
  const [watchList, setWatchList] = useState({});

  return (
    <>
      <h1>PersonalProfile</h1>

      <NavbarProfile
        setSelect={setSelect}
        select={select}
        setSubmittedDeals={setSubmittedDeals}
        setWatchList={setWatchList}
      />

      <AccountDetails select={select} />
      <SubmittedDeals select={select} submittedDeals={submittedDeals} />
      <Watchlist select={select} watchList={watchList} />
    </>
  );
}

export default PersonalProfile;
