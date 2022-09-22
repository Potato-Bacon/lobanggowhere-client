import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SERVER } from "../utils/constants";
import { v4 as uuidv4 } from "uuid";
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
    <>
      <div className="font-semibold">Public Profile</div>

      <div className="my-6">
        Username: {publicProfile?.data?.[0]?.submittedBy}
      </div>
      {publicProfile?.data?.map((deals) => (
        <div className="flex" key={uuidv4()}>
          <div>
            <Link to={`/deals/${deals._id}`}>
              <div className="font-semibold">{deals.title} </div>
              <img style={{ maxHeight: "200px" }} src={deals.img} alt="image" />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default PublicProfile;
