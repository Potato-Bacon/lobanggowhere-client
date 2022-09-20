import axios from "axios";
import { SERVER } from "../../utils/constants";

/* eslint-disable react/prop-types */
const ApproveDeals = ({ select, setSelect, setRender, render }) => {
  const id = select._id;
  const handleApproval = (status) => () => {
    const updateStatus = async () => {
      const body = { status };
      const url = SERVER + `/admin/${id}`;
      await axios.put(url, body);
    };
    // updateStatus();

    setRender((prev) => {
      return [...prev.filter((x) => x?._id !== select?._id)];
    });

    // render.filter(x=>{x?._id!==select?._id})===[]?
    // setSelect(render[1]):setSelect(render)
  };
  return (
    <>
      <div
        style={{
          border: "10px solid",
          width: "500px",
          height: "600px",
          overflow: "scroll",
        }}
      >
        <div>
          <img
            src={select.img}
            alt="Deals image"
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
            }}
          />
          <h1>{select.title}</h1>
        </div>
        <div>
          <h3>
            Description: <span>{select.description}</span>
          </h3>
          <h3>
            Link to source:{" "}
            <a href={select.url} target="_blank" rel="noopener noreferrer">
              view
            </a>
          </h3>
          <h3>
            Vendor: <span>{select.vendor}</span>
          </h3>
          <h3>
            Online/inStore: <span>{select.onlineAndOrStore}</span>
          </h3>
          <h3>
            Category: <span>{select.category?.classification}</span>
          </h3>
          {select?.dealsCategory === "custom" && (
            <h3>
              Deal : <span>{select.custom}</span>
            </h3>
          )}
          {select?.dealsCategory === "free" && (
            <h3>
              Deal : <span>Free</span>
            </h3>
          )}
          {select?.dealsCategory === "discounts" && (
            <div>
              <h3>Previous Price: ${select.priceBeforeDiscount}</h3>
              <h3>Discounted Price: ${select.priceAfterDiscount}</h3>
            </div>
          )}
        </div>
        <button onClick={handleApproval("Approve")}>Approve</button>
        <button onClick={handleApproval("Reject")}>Reject</button>
      </div>
    </>
  );
};

export default ApproveDeals;
