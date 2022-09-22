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
    <div>
      <div className="flex-wrap px-8 py-6 shadow-2xl bg-white bg-opacity-20 backdrop-blur-md rounded-xl drop-shadow-lg ">
        {renderList.length !== 0 && (
          <div
            style={{
              width: "500px",
              height: "600px",
            }}
          >
            <div>
              <img
                src={display.img}
                alt="Deals image"
                className="max-w-xs max-h-80"
              />
              <h1 className="text-2xl">{display.title}</h1>
            </div>
            <div className="text-lg">
              <h3>
                Description:{" "}
                <span className="text-base">{display.description}</span>
              </h3>
              <h3>
                Link to source:{" "}
                <a href={display.url} target="_blank" rel="noopener noreferrer">
                  view
                </a>
              </h3>
              <h3>
                Vendor: <span className="text-base">{display.vendor}</span>
              </h3>
              <h3>
                Online/inStore:{" "}
                <span className="text-base">{display.onlineAndOrStore}</span>
              </h3>
              <h3>
                Category: <span>{display.category.classification}</span>
              </h3>
              {display.dealsCategory === "custom" && (
                <h3>
                  Deal: <span className="text-base">{display.custom}</span>
                </h3>
              )}
              {display.dealsCategory === "free" && (
                <h3>
                  Deal: <span>Free</span>
                </h3>
              )}
              {display.dealsCategory === "discounts" && (
                <div>
                  <h3>Previous Price: ${display.priceBeforeDiscount}</h3>
                  <h3>Discounted Price: ${display.priceAfterDiscount}</h3>
                </div>
              )}
            </div>
            <div className="flex justify-self-center mt-3">
              <button
                className=" px-7 mx-4 ml-1 inline-block text-sm font-medium text-white bg-primary border border-primary transition rounded-md shrink-0 hover:bg-error hover:text-white focus:outline-none focus:ring active:text-primary"
                onClick={handleApproval("Approve")}
              >
                Approve
              </button>
              <button
                className="ml-1 inline-block px-10 text-sm font-medium text-white bg-primary border border-primary transition rounded-md shrink-0 hover:bg-error hover:text-white focus:outline-none focus:ring active:text-primary"
                onClick={handleApproval("Reject")}
              >
                Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveDeals;
