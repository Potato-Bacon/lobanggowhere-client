import axios from "axios";
import { SERVER } from "../../utils/constants";

/* eslint-disable react/prop-types */
const ApproveDeals = ({ display, setDisplay, setRenderList, renderList }) => {
  const handleApproval = (status) => () => {
    if (renderList) {
      const id = display._id;
      const updateStatus = async () => {
        const body = { status };
        const url = SERVER + `/admin/${id}`;
        await axios.put(url, body);
      };
      updateStatus();

      2;
      const current_position = renderList.indexOf(display);
      console.log(current_position);
      console.log(typeof display, "type");

      const new_list = structuredClone(renderList).filter(
        (x) => x._id !== display._id
      );
      setRenderList(new_list);

      if (current_position !== new_list.length) {
        setDisplay(new_list[current_position]);
      } else {
        setDisplay(new_list[current_position - 1]);
      }
    }
  };
  return (
    <>
      {renderList.length !== 0 && (
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
              src={display.img}
              alt="Deals image"
              style={{
                maxWidth: "300px",
                maxHeight: "300px",
              }}
            />
            <h1>{display.title}</h1>
          </div>
          <div>
            <h3>
              Description: <span>{display.description}</span>
            </h3>
            <h3>
              Link to source:{" "}
              <a href={display.url} target="_blank" rel="noopener noreferrer">
                view
              </a>
            </h3>
            <h3>
              Vendor: <span>{display.vendor}</span>
            </h3>
            <h3>
              Online/inStore: <span>{display.onlineAndOrStore}</span>
            </h3>
            <h3>
              Category: <span>{display.category.classification}</span>
            </h3>
            {display.dealsCategory === "custom" && (
              <h3>
                Deal : <span>{display.custom}</span>
              </h3>
            )}
            {display.dealsCategory === "free" && (
              <h3>
                Deal : <span>Free</span>
              </h3>
            )}
            {display.dealsCategory === "discounts" && (
              <div>
                <h3>Previous Price: ${display.priceBeforeDiscount}</h3>
                <h3>Discounted Price: ${display.priceAfterDiscount}</h3>
              </div>
            )}
          </div>
          <button onClick={handleApproval("Approve")}>Approve</button>
          <button onClick={handleApproval("Reject")}>Reject</button>
        </div>
      )}
    </>
  );
};

export default ApproveDeals;
