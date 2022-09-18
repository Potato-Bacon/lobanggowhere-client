import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER } from "../utils/constants";
import { useParams } from "react-router-dom";

function DealDetails() {
  let { id } = useParams();
  const [render, setRender] = useState("");
  const url = `${SERVER}deals/${id}`;

  useEffect(() => {
    const fetchDeal = async () => {
      const res = await axios.get(url);
      setRender(res.data);
    };
    fetchDeal();
  }, []);

  const handleWatchList = () => {
    const updateWatchList = async () => {
      // const res = await axios.put(url);
      //state to update watch list
      //watchlist needs to show liked or not
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
        <button onClick={handleWatchList}>WatchList</button>
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
