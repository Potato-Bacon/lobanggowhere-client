import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SERVER } from "../utils/constants";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

function DealDetails() {
  const { user } = useContext(AuthContext);
  let { id } = useParams();
  const [isWatchList, setIsWatchList] = useState(false);
  const [render, setRender] = useState("");
  const url = `${SERVER}/deals`;

  useEffect(() => {
    if (user.watchList.includes(id)) {
      setIsWatchList(true);
    }
    const fetchDeal = async () => {
      const res = await axios.get(`${url}/${id}`);
      setRender(res.data);
    };
    fetchDeal();
  }, []);

  const handleWatchList = () => {
    const name = user.userName;

    const updateWatchList = async () => {
      if (isWatchList === false) {
        setIsWatchList(true);
        const addWatchListURL = `${url}/addtowatchlist/${name}`;
        const res = await axios.put(addWatchListURL, [id]);
        console.log(res.data.watchList);
      } else {
        setIsWatchList(false);

        const removeWatchListURL = `${url}/removefromwatchlist/${name}`;
        const res = await axios.put(removeWatchListURL, [id]);
        console.log(res.data.watchList);
      }
    };
    updateWatchList();
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
          ❤️<span>{render.likes}</span>
        </p>
        <button
          style={{ background: isWatchList === false ? "green" : "red" }}
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
