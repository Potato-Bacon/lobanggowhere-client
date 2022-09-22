import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AuthContext from "../../context/AuthProvider";
import { SERVER } from "../../utils/constants";
import DeleteMyDeal from "./DeleteMyDeal";

function SubmittedDeals({ select }) {
  const { user, submittedDeals, setSubmittedDeals } = useContext(AuthContext);

  useEffect(() => {
    renderSubmittedDeals();
  }, [select]);

  const renderSubmittedDeals = async () => {
    const submissions = user.submissions;
    console.log(submissions, "total");
    const url = SERVER + `/account/submitteddeals`;

    // console.log(submittedDeals, "current");
    const data = await axios.post(url, submissions);
    console.log(data, "test");

    setSubmittedDeals(data.data);
  };

  return (
    <>
      {select === "SubmittedDeals" && (
        <div
          className="flex-wrap bg-white bg-opacity-20 backdrop-blur-md
         px-8 py-6 rounded-xl drop-shadow-lg "
        >
          {submittedDeals?.map((deal) => (
            <div key={uuidv4()}>
              <h3 className="m-8 font-semibold">{deal.title}</h3>
              <img
                className="m-8"
                style={{
                  maxHeight: "200px",
                }}
                src={deal.img}
                alt="image"
              />
              <div className="m-8" name="status">
                Status: <span>{deal.submittedStatus}</span>
              </div>
              {deal.submittedStatus !== "Approve" && (
                <DeleteMyDeal deal={deal} />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SubmittedDeals;
