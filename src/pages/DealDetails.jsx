import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER } from "../utils/constants";
import { useParams } from "react-router-dom";
const url = `${SERVER}deals/`;

function DealDetails() {
  let { id } = useParams();
  const [render, setRender] = useState("");
  useEffect(() => {
    const fetchDeal = async () => {
      const res = await axios.get(`${url}${id}`);
      setRender(res.data);
    };
    fetchDeal();
  }, []);

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
        <button>Watch list</button>
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
        {render?.dealsCategory === "Custom" && (
          <h3>
            Deal : <span>{render.custom}</span>
          </h3>
        )}
        {render?.dealsCategory === "Free" && (
          <h3>
            Deal : <span>Free</span>
          </h3>
        )}
        {render?.dealsCategory === "Discount" && (
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
