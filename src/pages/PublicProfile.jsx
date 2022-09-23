import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SERVER } from "../utils/constants";
import { v4 as uuidv4 } from "uuid";
import background from "/src/images/pexels-anni-roenkae.jpg";

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

  return (
    <div
      style={{
        backgroundImage: `url("${background}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        objectFit: "fill",
        minHeight: "100vh",
      }}
      className="pt-10"
    >
      <div className="font-semibold">Public Profile</div>

      <div className="my-6">
        <span className="text-2xl ml-4">
          Username: {publicProfile?.data?.[0]?.submittedBy}
        </span>
      </div>
      {publicProfile?.data?.map((deals) => (
        <div className="flex " key={uuidv4()}>
          <div
            className="bg-white bg-opacity-20 backdrop-blur-md
         px-8 py-6 rounded-xl drop-shadow-lg m-3"
          >
            <Link to={`/deals/${deals._id}`}>
              <div className="font-semibold">{deals.title} </div>
              <img
                style={{ maxHeight: "200px" }}
                src={deals.img}
                alt="image"
                className="rounded-md my-3"
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PublicProfile;
