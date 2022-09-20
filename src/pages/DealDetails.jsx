import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SERVER } from "../utils/constants";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

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
        // const addLikeURL = `${url}/addlike/${name}`;
        // const res = await axios.put(addLikeURL, [id]);
        // console.log(res.data.likes);

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

        // const removeLikeURL = `${url}/removelike/${name}`;
        // const res = await axios.put(removeLikeURL, [id]);
        // console.log(res.data.likes);

        const subtractLikeToDealURL = `${url}/subtractcount/${id}`;
        const dealRes = await axios.put(subtractLikeToDealURL, [name]);
        console.log("remove", dealRes.data.likes);
      }
    };
    updateLike();
  };
  return (
    <>
      <div>
        <img
          src={render.img}
          alt="Deals image"
          style={{
            maxWidth: "500px",
            maxHeight: "500px",
          }}
        />
        <h1>{render.title}</h1>
        <p>
          ❤️<span>{likeCount}</span>
          <button
            style={{
              background:
                user?.likes?.includes(id) === false ? "white" : "green",
            }}
            onClick={handleLike}
          >
            like
          </button>
        </p>
        <button
          style={{
            background:
              user?.watchList?.includes(id) === false ? "green" : "red",
          }}
          onClick={handleWatchList}
        >
          WatchList
        </button>
      </div>
      <div>
        <h3>
          Description: <span>{render.description}</span>
        </h3>
        <h3>
          Link to source:{" "}
          <a href={render.url} target="_blank" rel="noopener noreferrer">
            view
          </a>
        </h3>
        <h3>
          Vendor: <span>{render.vendor}</span>
        </h3>
        <h3>
          Online/inStore: <span>{render.onlineAndOrStore}</span>
        </h3>
        <h3>
          Category: <span>{render.category?.classification}</span>
        </h3>
        {render?.dealsCategory === "custom" && (
          <h3>
            Deal : <span>{render.custom}</span>
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
      </div>
    </>
  );
}

export default DealDetails;
