import { useState } from "react";
import AccountDetails from "../components/personalprofile/AccountDetails";
import NavbarProfile from "../components/personalprofile/NavbarProfile";
import SubmittedDeals from "../components/personalprofile/SubmittedDeals";
import Watchlist from "../components/personalprofile/Watchlist";

function PersonalProfile() {
  const [select, setSelect] = useState("");

  return (
    <>
      <h1>PersonalProfile</h1>

      <NavbarProfile setSelect={setSelect} />

      <AccountDetails select={select} />
      <SubmittedDeals select={select} />
      <Watchlist select={select} />
    </>
  );
}

export default PersonalProfile;
