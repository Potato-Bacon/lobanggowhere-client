import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SERVER } from "../utils/constants";

function PublicProfile() {
  const [publicProfile, setPublicProfile] = useState({});
  const { username } = useParams();
  const handlePublicProfile = async () => {
    const url = SERVER + `/profile/${username}`;
    console.log(url);
    const data = await axios.get(url);
    setPublicProfile(data);
  };
  useEffect(() => {
    handlePublicProfile();
  }, []);

  // console.log(publicProfile.data[0].img, "test");
  return (
    <>
      <h1>Public Profile</h1>
      <h2>{publicProfile?.data?.[0]?.submittedBy}</h2>

      {publicProfile?.data?.map((deals) => (
        <>
          <Link to={`/deals/${deals._id}`}>
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
          </Link>
        </>
      ))}
    </>
  );
}

export default PublicProfile;
