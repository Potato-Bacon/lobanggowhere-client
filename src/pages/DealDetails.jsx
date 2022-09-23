import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SERVER } from "../utils/constants";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import background from "/src/images/pexels-anni-roenkae.jpg";

function DealDetails() {
  const { user, setUser } = useContext(AuthContext);
  let { id } = useParams();

  const [render, setRender] = useState("");
  const [likeCount, setLikeCount] = useState("");
  const url = `${SERVER}/deals`;

  useEffect(() => {
    const fetchDeal = async () => {
      const res = await axios.get(`${url}/${id}`);
      setRender(res.data);
      setLikeCount(res?.data?.likes?.length);
    };
    fetchDeal();
  }, []);

  const handleWatchList = () => {
    const name = user.userName;

    const updateWatchList = async () => {
      if (user?.watchList?.includes(id) === false) {
        const watching = structuredClone(user);
        watching.watchList.push(id);
        setUser(watching);
        const addWatchListURL = `${url}/addtowatchlist/${name}`;
        const res = await axios.put(addWatchListURL, [id]);
        console.log(res.data.watchList);
      }
      if (user?.watchList?.includes(id) === true) {
        const watching = structuredClone(user);
        console.dir(watching);
        watching.watchList.splice(watching.watchList.indexOf(id), 1);
        setUser(watching);

        const removeWatchListURL = `${url}/removefromwatchlist/${name}`;
        const res = await axios.put(removeWatchListURL, [id]);
        console.log(res.data.watchList);
      }
    };
    updateWatchList();
  };

  const handleLike = () => {
    const name = user.userName;
    const updateLike = async () => {
      if (user?.likes?.includes(id) === false) {
        const userLike = structuredClone(user);
        userLike.likes.push(id);
        setUser(userLike);
        setLikeCount(likeCount + 1);
        const addLikeURL = `${url}/addlike/${name}`;
        const res = await axios.put(addLikeURL, [id]);
        console.log(res.data.likes);

        const addLikeToDealURL = `${url}/addcount/${id}`;
        const dealRes = await axios.put(addLikeToDealURL, [name]);
        console.log("add count", dealRes.data.likes);
      }
      if (user?.likes?.includes(id) === true) {
        const userLike = structuredClone(user);
        console.dir(userLike);
        userLike.likes.splice(userLike.likes.indexOf(id), 1);
        setUser(userLike);
        setLikeCount(likeCount - 1);

        const removeLikeURL = `${url}/removelike/${name}`;
        const res = await axios.put(removeLikeURL, [id]);
        console.log(res.data.likes);

        const subtractLikeToDealURL = `${url}/subtractcount/${id}`;
        const dealRes = await axios.put(subtractLikeToDealURL, [name]);
        console.log("remove", dealRes.data.likes);
      }
    };
    updateLike();
  };
  return (
    <div
      style={{
        backgroundImage: `url("${background}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        objectFit: "fill",
        minHeight: "100vh",
      }}
    >
      <div className="flex justify-evenly pt-24 items-start">
        <div
          className="flex-wrap bg-white bg-opacity-20 backdrop-blur-md px-8 py-6 rounded-xl drop-shadow-lg "
        >
          <img
            src={render.img}
            alt="Deals image"
            style={{ maxHeight: "600px" }}
            className="rounded-lg object-cover max-w-xl mb-2"
          />
          <a href={render.url} target="_blank" rel="noopener noreferrer">
            click here for more info
          </a>
        </div>
        <div
          className="flex-wrap w-2/5 bg-test bg-white bg-opacity-20 backdrop-blur-md

px-8 py-6 rounded-xl drop-shadow-lg shadow-2xl ml-14"
        >
          <div>
            <h1 className="text-4xl">{render.title}</h1>

            <div className="flex py-1">
              <button onClick={handleLike} className="pr-2">
                {user?.likes?.includes(id) === true ? "❤️" : "🤍"}
                {likeCount}likes
              </button>
              <p>WatchList</p>

              <button onClick={handleWatchList} className="pr-2">
                {user?.watchList?.includes(id) === true ? "✖️" : "➕"}
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-sm">
              <span>{render.description}</span>
            </h3>
            <br />

            <h3 className="text-lg">{render.vendor}</h3>
            {/* <h3 className=" text-base ">{render.category?.classification}</h3> */}
            <h3>
              Online/inStore: <span>{render.onlineAndOrStore}</span>
            </h3>
            {render?.dealsCategory === "custom" && (
              <h3>
                Deal: <span>{render.custom}</span>
              </h3>
            )}
            {render?.dealsCategory === "free" && (
              <h3>
                Deal : <span>Free</span>
              </h3>
            )}
            {render?.dealsCategory === "discounts" && (
              <div>
                <h3>Previous Price: ${render.priceBeforeDiscount}</h3>
                <h3>Discounted Price: ${render.priceAfterDiscount}</h3>
              </div>
            )}

            <Link to={`/profile/${render.submittedBy}`}>
              <span>Submitted by: </span>
              <span className="underline">{render.submittedBy}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealDetails;
