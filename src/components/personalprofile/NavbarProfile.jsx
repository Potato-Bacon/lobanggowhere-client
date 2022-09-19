function NavbarProfile({ setSelect }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div onClick={() => setSelect("AccountDetails")}>Account Details</div>
        <div onClick={() => setSelect("SubmittedDeals")}>Submitted Deals</div>
        <div onClick={() => setSelect("Watchlist")}>Watchlist</div>
      </div>
    </>
  );
}

export default NavbarProfile;
