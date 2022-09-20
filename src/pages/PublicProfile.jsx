function PublicProfile(publicProfile) {
  console.log(publicProfile, "here");
  console.log(publicProfile.publicProfile.data[0].img, "test");
  return (
    <>
      <h1>Public Profile</h1>
      <h2>{publicProfile.publicProfile.data[0].submittedBy}</h2>

      {publicProfile.publicProfile.data?.map((deals) => (
        <>
          <h3>{deals.title} </h3>
          <img
            style={{
              minHeight: "16rem",
              maxHeight: "16rem",
              overflow: "hidden",
              height: "50%",
              width: "50%",
            }}
            src={deals.img}
            alt="image"
          />
        </>
      ))}
    </>
  );
}

export default PublicProfile;
